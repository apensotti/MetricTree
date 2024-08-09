import { format } from "path";
import { getMetricTreeData } from "./metricTreeData";
import { TreeDataProps } from "./metricTreeData";

export interface TemplateProps {
    id: number;
    title: string;
    valueStart: string;
    valueEnd: string;
    change: string;
    start_month: string;
    end_month: string;
    year: number;
    children?: TemplateProps[];
  }

function formatNumber(num: number, currency: boolean): string {
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
}

export async function generateMetricTreeData(): Promise<TemplateProps[]> {
    const data: TreeDataProps = await getMetricTreeData('./metric_tree.csv');
    console.log(data);
    return [
    {
        id: 1,
        title: "Revenue",
        start_month: data.previous_month,
        end_month: data.current_month,
        year: data.year,
        valueStart: formatNumber(data.previous_total_revenue, true),
        valueEnd: formatNumber(data.current_total_revenue, true),
        change: formatNumber(data.current_total_revenue - data.previous_total_revenue, true),
        children: [
        {
            id: 2,
            title: "1st Appointments Revenue", 
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_first_revenue, true),
            valueEnd: formatNumber(data.current_first_revenue, true),
            change: formatNumber(data.current_first_revenue - data.previous_first_revenue, true),
            children: [
                {
                    id: 3,
                    title: "Repeat 1st Appointments",
                    start_month: data.previous_month,
                    end_month: data.current_month,
                    year: data.year,
                    valueStart: formatNumber(data.previous_first_appointment, false),
                    valueEnd: formatNumber(data.current_first_appointment, false),
                    change: formatNumber(data.current_first_appointment - data.previous_first_appointment, false),
                    children: [],
                },
                {
                    id: 4,
                    title: "Revenue Per Repeat Appointments",
                    start_month: data.previous_month,
                    end_month: data.current_month,
                    year: data.year,
                    valueStart: formatNumber((data.previous_first_revenue/data.previous_first_appointment), true),
                    valueEnd: formatNumber((data.current_first_revenue/data.current_first_appointment), true),
                    change: formatNumber((data.current_first_revenue/data.current_first_appointment) - (data.previous_first_revenue/data.previous_first_appointment), true),
                    children: [],
                },
            ],
        },
        {
            id: 5,
            title: "Repeat Appointments Revenue",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_repeat_revenue, true),
            valueEnd: formatNumber(data.current_repeat_revenue, true),
            change: formatNumber(data.current_repeat_revenue - data.previous_repeat_revenue, true),
            children: [
                {
                    id: 6,
                    title: "Repeat Appointments",
                    start_month: data.previous_month,
                    end_month: data.current_month,
                    year: data.year,
                    valueStart: formatNumber(data.previous_repeat_appointment, false),
                    valueEnd: formatNumber(data.current_repeat_appointment, false),
                    change: formatNumber(data.current_repeat_appointment - data.previous_repeat_appointment, false),
                    children: [],
                },
                {
                    id: 7,
                    title: "Revenue Per Repeat Appointments",
                    start_month: data.previous_month,
                    end_month: data.current_month,
                    year: data.year,
                    valueStart: formatNumber((data.previous_repeat_revenue/data.previous_repeat_appointment), true),
                    valueEnd: formatNumber((data.current_repeat_revenue/data.current_repeat_appointment), true),
                    change: formatNumber((data.current_repeat_revenue/data.current_repeat_appointment) - (data.previous_repeat_revenue/data.previous_repeat_appointment), true),
                    children: [],
                },
            ],
        }
      ],
    }
  ];
}
