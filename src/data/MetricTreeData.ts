import { tree } from 'next/dist/build/templates/app-page';
import Papa from 'papaparse';

interface RawDataProps {
    date: Date;
    year: string;
    month: string;
    week_start_date: Date;
    week_number: string;
    week_number_year: string;
    trailing_7d: string;
    attribution_type: string;
    channel_type: string;
    strategy: string;
    platform: string;
    channel: string;
    market: string;
    investment: string;
    agency_fees: string;
    violet_fee: string;
    sessions: string;
    phone_calls: string;
    form_submissions: string;
    leads: string;
    first_appointments_completed: string;
    second_appointments_completed: string;
    repeat_appointments_completed: string;
    first_revenue: string;
    repeat_revenue: string;
    twenty_one_days_revenue: string;
    twenty_eight_days_revenue: string;
    ninety_days_revenue: string;
    one_hundred_eighty_days_revenue: string;
    contribution_margin: string;
}

export interface TreeDataProps {
    year: number;
    current_month: string;
    current_first_appointment: number;
    current_repeat_appointment: number;
    current_first_revenue: number;
    current_repeat_revenue: number;
    current_total_revenue: number;
    current_total_appointments: number;
    previous_month: string;
    previous_first_appointment: number;
    previous_repeat_appointment: number;
    previous_first_revenue: number;
    previous_repeat_revenue: number;
    previous_total_revenue: number;
    previous_total_appointments: number;
}

interface Attributes {
    date: Date;
    market: string;
    channel: string;
    first_appointment: number;
    repeat_appointment: number;
    first_revenue: number;
    repeat_revenue: number;
}

function getAbbreviatedMonth(date: Date) {
    const monthAbbreviations = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthIndex = date.getMonth();
    return monthAbbreviations[monthIndex];
}

export async function parseCSV(): Promise<RawDataProps[]> {
    const response = await fetch("http://localhost:3000/metric_tree.csv");
    const csvText = await response.text();
    const parsed = Papa.parse<RawDataProps>(csvText, { header: true });
    const source = parsed.data;
    return source;
}

export async function generateMetricTreeData(startDate: Date, endDate: Date): Promise<TreeDataProps> {
        const source = await parseCSV();

        const filter1 = (item: Attributes) => item.date >= startDate && item.date <= endDate;
        const filter2 = (item: Attributes) => item.market === "Texas";
        const filter3 = (item: Attributes) => item.channel === "Organic";

        const filters = [filter1, filter2, filter3];

        const data = source.map(item => ({
                date: item.date,
                market: item.market,
                channel: item.channel,
                first_appointment: parseFloat(item.first_appointments_completed),
                repeat_appointment: parseFloat(item.repeat_appointments_completed),
                first_revenue: parseFloat(item.first_revenue),
                repeat_revenue: parseFloat(item.repeat_revenue)
        }));

        const dateRangeData = data.filter(item => {
            const itemDate = new Date(item.date);
            const data = itemDate >= startDate && itemDate <= endDate
            return itemDate >= startDate && itemDate <= endDate;
        });

        const test = filters.reduce((data, filter) => data.filter(filter), data);

        const currentMonthData = data.filter(item => {
            const currentMonth = new Date().getMonth();
            const month = new Date(item.date).getMonth();
            return month === currentMonth;
        });

        const previousMonthData = data.filter(item => {
            const currentMonth = new Date().getMonth();
            const month = new Date(item.date).getMonth();
            return month === currentMonth-1;
        });

        const treeData = {
            year: new Date().getFullYear(),
            current_month: getAbbreviatedMonth(new Date()),
            current_first_appointment: currentMonthData.reduce((total, item) => total + item.first_appointment, 0),
            current_repeat_appointment: currentMonthData.reduce((total, item) => total + item.repeat_appointment, 0),
            current_first_revenue: currentMonthData.reduce((total, item) => total + item.first_revenue, 0),
            current_repeat_revenue: currentMonthData.reduce((total, item) => total + item.repeat_revenue, 0),
            current_total_revenue: currentMonthData.reduce((total, item) => total + item.first_revenue + item.repeat_revenue, 0),
            current_total_appointments: currentMonthData.reduce((total, item) => total + item.first_appointment + item.repeat_appointment, 0),
            previous_month: getAbbreviatedMonth(new Date(new Date().setMonth(new Date().getMonth()-1))),
            previous_first_appointment: previousMonthData.reduce((total, item) => total + item.first_appointment, 0),
            previous_repeat_appointment: previousMonthData.reduce((total, item) => total + item.repeat_appointment, 0),
            previous_first_revenue: previousMonthData.reduce((total, item) => total + item.first_revenue, 0),
            previous_repeat_revenue: previousMonthData.reduce((total, item) => total + item.repeat_revenue, 0),
            previous_total_revenue: previousMonthData.reduce((total, item) => total + item.first_revenue + item.repeat_revenue, 0),
            previous_total_appointments: previousMonthData.reduce((total, item) => total + item.first_appointment + item.repeat_appointment, 0),
        };

        return treeData;

    }

export async function getPreviousTwoWeeksData(date: Date,): Promise<RawDataProps[]> {
    const data = await parseCSV();

    const twoWeeksAgo = new Date(date.getTime() - (14 * 24 * 60 * 60 * 1000));
    const previousTwoWeeksData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= twoWeeksAgo && itemDate < date;
    });
    return previousTwoWeeksData;
}

export function generateTree () {
    
}
