import { tree } from 'next/dist/build/templates/app-page';
import { type Edge, type Node, MarkerType } from "@xyflow/react";
import Papa from 'papaparse';
import { PlusIcon } from '@radix-ui/react-icons';
import { format } from 'path';
import { TreeDataProps, ParsedProps, RawDataProps } from './props';
import { DoubleDateRange } from './props';

function getAbbreviatedMonth(date: Date) {
    const monthAbbreviations = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthIndex = date.getMonth();
    return monthAbbreviations[monthIndex];
}

export async function parseCSV(): Promise<RawDataProps[]> {
    const response = await fetch("/api/csv");
    const csvText = await response.text();
    const parsed = Papa.parse<RawDataProps>(csvText, { header: true });
    const source = parsed.data;
    return source;
}

// function to filter data

export async function parseData(
    range_from: Date,
    range_to: Date,
    market: string[], 
    channel: string[], 
    strategy: string[], 
    platform: string[], 
    channelType: string[],
    comapre: boolean,
    ranges: DoubleDateRange
): Promise<TreeDataProps> {

    const source = await parseCSV();

    const data = source.map(item => ({
        date: item.date,
        market: item.market,
        channel: item.channel,
        channel_type: item.channel_type,
        strategy: item.strategy,
        platform: item.platform,
        first_appointment: parseFloat(item.first_appointments_completed),
        repeat_appointment: parseFloat(item.repeat_appointments_completed),
        first_revenue: parseFloat(item.first_revenue),
        repeat_revenue: parseFloat(item.repeat_revenue)
    }));
    
    // Data Filtering 
    const marketFilter = (item: ParsedProps) => market.includes(item.market);
    const channelFilter = (item: ParsedProps) => channel.includes(item.channel);
    const strategyFilter = (item: ParsedProps) => strategy.includes(item.strategy);
    const platformFilter = (item: ParsedProps) => platform.includes(item.platform);
    const channelTypeFilter = (item: ParsedProps) => channelType.includes(item.channel_type);
    const filters = [marketFilter, channelFilter, strategyFilter, platformFilter, channelTypeFilter];
    const filteredData = filters.reduce((data, filter) => data.filter(filter), data);
    
    // Find date range midpoint

    const midpoint = new Date((range_from.getTime() + range_to.getTime()) / 2);
    let range1Data: ParsedProps[] = [];
    let range2Data: ParsedProps[] = [];


    if (comapre) {
        console.log(true)
        if(ranges.range1.from !== null && ranges.range1.to !== null && ranges.range2.from !== null && ranges.range2.to !== null) {
            range1Data = filteredData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= ranges.range1.from! && itemDate <= ranges.range1.to!;
            });
            range2Data = filteredData.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate > ranges.range2.from! && itemDate <= ranges.range2.to!;
            });
        }
    } else {
        console.log(false)
        // Range 1 and Range 2 data
        range1Data = filteredData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= range_from && itemDate <= midpoint;
        });
        range2Data = filteredData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate > midpoint && itemDate <= range_to;
        });
    }

    // Range 1 and Range 2 date ranges
    const range1_start_date = range_from;
    const range1_end_date = midpoint.toISOString().split('T')[0];
    const range2_start_date = midpoint.toISOString().split('T')[0];
    const range2_end_date = range_to;
    
    // Total range data
    const totalRangeData = filteredData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= range_from && itemDate <= range_to;
    });

    // Graph data aggregation
    const aggregatedDailyData: ParsedProps[] = [];
    const dateMap: { [key: string]: ParsedProps } = {};

    totalRangeData.forEach(item => {
        const dateKey = new Date(item.date).toISOString().split('T')[0]; // Extract the date as a key (YYYY-MM-DD format)

        if (!dateMap[dateKey]) {
            dateMap[dateKey] = {
                date: new Date(dateKey),
                market: item.market,
                channel: item.channel,
                channel_type: item.channel_type,
                strategy: item.strategy,
                platform: item.platform,
                first_appointment: 0,
                repeat_appointment: 0,
                first_revenue: 0,
                repeat_revenue: 0,
            };
        }

        dateMap[dateKey].first_appointment += item.first_appointment;
        dateMap[dateKey].repeat_appointment += item.repeat_appointment;
        dateMap[dateKey].first_revenue += item.first_revenue;
        dateMap[dateKey].repeat_revenue += item.repeat_revenue;
    });

    aggregatedDailyData.push(...Object.values(dateMap));

    const normalizeData = (data: number[], scale: number = 1) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
    
        return data.map(value => (value - min) / (max - min) * scale);
    };

    const logScaling = (data: number[]) => {
        return data.map(value => Math.log(value + 1));
    };

    const calculatePercentageChange = (newValue: number, oldValue: number): number => {    
        if (oldValue === 0) {
            return newValue === 0 ? 0 : 100;
        }
        return ((newValue - oldValue) / oldValue) * 100;
    };

    const calculateChange = (currentValue: number, range1Value: number): number => {
        return currentValue - range1Value;
    };

    // Tree data generation
    const treeData: TreeDataProps = {
        year: new Date().getFullYear(),
        range1_start_date: range1_start_date,
        range1_end_date: range1_end_date,
        range1_first_appointment: range1Data.reduce((total, item) => total + item.first_appointment, 0),
        range1_repeat_appointment: range1Data.reduce((total, item) => total + item.repeat_appointment, 0),
        range1_first_revenue: range1Data.reduce((total, item) => total + item.first_revenue, 0),
        range1_repeat_revenue: range1Data.reduce((total, item) => total + item.repeat_revenue, 0),
        range1_total_revenue: range1Data.reduce((total, item) => total + item.first_revenue + item.repeat_revenue, 0),
        range1_total_appointments: range1Data.reduce((total, item) => total + item.first_appointment + item.repeat_appointment, 0),
        range2_start_date:range2_start_date,
        range2_end_date:range2_end_date,
        range2_first_appointment: range2Data.reduce((total, item) => total + item.first_appointment, 0),
        range2_repeat_appointment: range2Data.reduce((total, item) => total + item.repeat_appointment, 0),
        range2_first_revenue: range2Data.reduce((total, item) => total + item.first_revenue, 0),
        range2_repeat_revenue: range2Data.reduce((total, item) => total + item.repeat_revenue, 0),
        range2_total_revenue: range2Data.reduce((total, item) => total + item.first_revenue + item.repeat_revenue, 0),
        range2_total_appointments: range2Data.reduce((total, item) => total + item.first_appointment + item.repeat_appointment, 0),
        revenue_total_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.first_revenue + item.repeat_revenue, 0),
            range1Data.reduce((total, item) => total + item.first_revenue + item.repeat_revenue, 0)
        ),
        first_appointment_total_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.first_appointment, 0),
            range1Data.reduce((total, item) => total + item.first_appointment, 0)
        ),
        repeat_appointment_total_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.repeat_appointment, 0),
            range1Data.reduce((total, item) => total + item.repeat_appointment, 0)
        ),
        first_revenue_total_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.first_revenue, 0),
            range1Data.reduce((total, item) => total + item.first_revenue, 0)
        ),
        repeat_revenue_total_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.repeat_revenue, 0),
            range1Data.reduce((total, item) => total + item.repeat_revenue, 0)
        ),
        first_appointment_per_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.first_revenue, 0) /
                range2Data.reduce((total, item) => total + item.first_appointment, 0),
            range1Data.reduce((total, item) => total + item.first_revenue, 0) /
                range1Data.reduce((total, item) => total + item.first_appointment, 0)
        ),
        repeat_appointment_per_change: calculatePercentageChange(
            range2Data.reduce((total, item) => total + item.repeat_revenue, 0) /
                range2Data.reduce((total, item) => total + item.repeat_appointment, 0),
            range1Data.reduce((total, item) => total + item.repeat_revenue, 0) /
                range1Data.reduce((total, item) => total + item.repeat_appointment, 0)
        ),
        repeat_revenue_chart: aggregatedDailyData.map(item => item.repeat_revenue),
        first_revenue_chart: aggregatedDailyData.map(item => item.first_revenue),
        total_revenue_chart: aggregatedDailyData.map(item => item.first_revenue + item.repeat_revenue),
        repeat_appoitnment_chart: aggregatedDailyData.map(item => item.repeat_appointment),
        first_appointment_chart: aggregatedDailyData.map(item => item.first_appointment),
        repeat_appointment_per_chart: aggregatedDailyData.map(item => {
            const result = item.repeat_revenue / item.repeat_appointment;
            return isNaN(result) || !isFinite(result) ? 0 : result;
        }),
        first_appointment_per_chart: aggregatedDailyData.map(item => {
            const result = item.first_revenue / item.first_appointment;
            return isNaN(result) || !isFinite(result) ? 0 : result;
        })
    }; 

    return treeData;
}



// Function to generate tree data

export function formatNumber(num: number, currency: boolean): string {
    if (currency === true) {
        if (num >= 1e6) {
            return "$" + (num / 1e6).toFixed(2) + 'M';
        } else if (num >= 1e3) {
            return "$" + (num / 1e3).toFixed(2) + 'K';
        } else if (num < 0 && num <= -1e6) {
            return `-$${Math.abs(-num / 1e6).toFixed(2)}` + 'M';
        } else if (num < 0 && num <= -1e3) {
            return `-$${Math.abs(-num / 1e3).toFixed(2)}` + 'K';
        } else {
            if (num < 0) {
                return `-$${Math.abs(num).toFixed(2)}`;
            } else {
                return "$" + num.toFixed(2).toString();
            }
        }
    }
    else {
        if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        } else if (num < 0 && num <= -1e6) {
            return "-" + (-num / 1e6).toFixed(2) + 'M';
        } else if (num < 0 && num <= -1e3) {
            return "-" + (-num / 1e3).toFixed(2) + 'K';
        } else {
            return num.toFixed(2).toString();
        }   
    }
};

export function formatPercentageChange(num: number): string {
    const formattedNum = Math.abs(num).toFixed(2);
    if (num > 0) {
        return `+${formattedNum}%`;
    } else if (num < 0) {
        return `-${formattedNum}%`;
    } else {
        return '0.00%';
    }
}

export async function generateMetricTreeData(data: TreeDataProps): Promise<Node[]> {

    return [
    {
        id: '1',
        type: 'data',
        data: {
            title: "Revenue",
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber(data.range1_total_revenue, true),
            valueEnd: formatNumber(data.range2_total_revenue, true),
            change: formatNumber(data.range2_total_revenue - data.range1_total_revenue, true),
            chartData: data.total_revenue_chart
        },
        position: {x: 0, y: 0},
        draggable: true,
        selectable: true

    },
    {
        id: '2a',
        type: 'data',
        data: {
            title: "1st Appointments Revenue", 
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber(data.range1_first_revenue, true),
            valueEnd: formatNumber(data.range2_first_revenue, true),
            change: formatNumber(data.range2_first_revenue - data.range1_first_revenue, true),
            chartData: data.first_revenue_chart

        },
        position: {x: -450, y: 450}
    },
    {
        id: '3a',
        type: 'data',
        data: {
            title: "# of 1st Appointments",
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber(data.range1_first_appointment, false),
            valueEnd: formatNumber(data.range2_first_appointment, false),
            change: formatNumber(data.range2_first_appointment - data.range1_first_appointment, false),
            chartData: data.first_appointment_chart
        },
        position: {x: -700, y: 900},

    },
    {
        id: '3b',
        type: 'data',
        data: {
            title: "Revenue Per 1st Appointments",
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber((data.range1_first_revenue/data.range1_first_appointment), true),
            valueEnd: formatNumber((data.range2_first_revenue/data.range2_first_appointment), true),
            change: formatNumber((data.range2_first_revenue/data.range2_first_appointment) - (data.range1_first_revenue/data.range1_first_appointment), true),
            chartData: data.first_appointment_per_chart
        },
        position: {x: -200, y: 900},
    },
    {
        id: '2b',
        type: 'data',
        data: {
            title: "Repeat Appointments Revenue",
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber(data.range1_repeat_revenue, true),
            valueEnd: formatNumber(data.range2_repeat_revenue, true),
            change: formatNumber(data.range2_repeat_revenue - data.range1_repeat_revenue, true),
            chartData: data.repeat_revenue_chart
        },
        position: {x: 450, y: 450}
    },
    {
        id: '3c',
        type: 'data',
        data: {
            title: "# of Repeat Appointments",
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber(data.range1_repeat_appointment, false),
            valueEnd: formatNumber(data.range2_repeat_appointment, false),
            change: formatNumber(data.range2_repeat_appointment - data.range1_repeat_appointment, false),
            chartData: data.repeat_appoitnment_chart
        },
        position: {x: 200, y: 900}
    },
    {
        id: '3d',
        type: 'data',
        data: {
            title: "Revenue Per Repeat Appointments",
            start_date: data.range1_start_date,
            end_date: data.range2_end_date,
            year: data.year,
            valueStart: formatNumber((data.range1_repeat_revenue/data.range1_repeat_appointment), true),
            valueEnd: formatNumber((data.range2_repeat_revenue/data.range2_repeat_appointment), true),
            change: formatNumber((data.range2_repeat_revenue/data.range2_repeat_appointment) - (data.range1_repeat_revenue/data.range1_repeat_appointment), true),
            chartData: data.repeat_appointment_per_chart
        },
        position: {x: 700, y: 900}
    },]
};

export async function generateMetricTreeConnections(data: TreeDataProps): Promise<Edge[]> {
    return [
        { id: '2a->1',
            type: 'custom-edge2', 
            source: '2a', 
            target: '1', 
            sourceHandle: 'top',
            targetHandle: 'bottom',
            data: {
                label: formatPercentageChange(data.first_revenue_total_change),
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' } 
            },
        { id: '2b->1', 
            type: 'custom-edge2', 
            source: '2b', 
            target: '1', 
            sourceHandle: 'top',
            targetHandle: 'bottom',
            data: {
                label: formatPercentageChange(data.repeat_revenue_total_change),
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' },
            animated: false
        },
        { id: '3a->2a', 
            type: 'custom-edge2', 
            source: '3a', 
            target: '2a', 
            sourceHandle: 'top',
            targetHandle: 'bottom',
            data: {
                label: formatPercentageChange(data.first_appointment_total_change),
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' } 
        },
        { id: '3b->2a', 
            type: 'custom-edge2', 
            source: '3b', 
            target: '2a', 
            sourceHandle: 'top',
            targetHandle: 'bottom',
            data: {
                label: formatPercentageChange(data.first_appointment_per_change),
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' } 
        },
        { id: '3c->2b', 
            type: 'custom-edge2', 
            source: '3c', 
            target: '2b', 
            sourceHandle: 'top',
            targetHandle: 'bottom',
            data: {
                label: formatPercentageChange(data.repeat_appointment_total_change),
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' }
        },
        { id: '3d->2b', 
            type: 'custom-edge2', 
            source: '3d', 
            target: '2b', 
            sourceHandle: 'top',
            targetHandle: 'bottom',
            data: {
                label: formatPercentageChange(data.repeat_appointment_per_change),
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' },
            animated: false
        },
        { id: '2a->2b', 
            type: "custom-edge", 
            source: '2a', 
            target: '2b', 
            sourceHandle: 'right',
            targetHandle: 'left',
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' },
            animated: false
        },
        { id: '3a->3b', 
            type: "custom-edge", 
            source: '3a', 
            target: '3b', 
            sourceHandle: 'right',
            targetHandle: 'left',
            data: {
                label: 'x',
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' },
            animated: false
        },
        { id: '2b->2a', 
            type: "custom-edge", 
            source: '2a', 
            target: '2b', 
            sourceHandle: 'right',
            targetHandle: 'left',
            data: {
                label: '+',
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' },
            animated: false
        },
        { id: '3c->3d', 
            type: "custom-edge", 
            source: '3c', 
            target: '3d', 
            sourceHandle: 'right',
            targetHandle: 'left',
            data: {
                label: 'x',
            },
            selectable: false,
            markerEnd: {type: MarkerType.ArrowClosed, height: 30, width: 30}, 
            style: { strokeDasharray: '5,5' },
            animated: false
        },
        
      ];
};

// Function for extracting unique filter values

export interface types {
    market: { value: string; label: string }[];
    channel: { value: string; label: string }[];
    strategy: { value: string; label: string }[];
    platform: { value: string; label: string }[];
    channel_type: { value: string; label: string }[];
}

export async function extractUniqueValues(): Promise<types> {
    const source = await parseCSV();

    const getUniqueValues = (array: RawDataProps[], key: keyof RawDataProps): string[] => {
        return Array.from(
            new Set(
                array.map(item => {
                    const value = item[key];
                    return value instanceof Date ? value.toISOString() : value.toString();
                })
            )
        );
    };

    const uniqueChannelTypes = getUniqueValues(source, "channel_type");
    const uniqueStrategies = getUniqueValues(source, "strategy");
    const uniquePlatforms = getUniqueValues(source, "platform");
    const uniqueChannels = getUniqueValues(source, "channel");
    const uniqueMarkets = getUniqueValues(source, "market");

    const formatToValueLabel = (values: string[]): { value: string; label: string }[] => {
        return values.map(value => ({ value, label: value }));
    };

    const result = {
        channel_type: formatToValueLabel(uniqueChannelTypes),
        strategy: formatToValueLabel(uniqueStrategies),
        platform: formatToValueLabel(uniquePlatforms),
        channel: formatToValueLabel(uniqueChannels),
        market: formatToValueLabel(uniqueMarkets),
    };

    return result;
}

