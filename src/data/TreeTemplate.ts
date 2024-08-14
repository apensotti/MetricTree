import { getMetricTreeData, TreeDataProps } from "./MetricTreeData";
import { type Edge, type Node, MarkerType } from "@xyflow/react";

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


export async function generateMetricTreeData(): Promise<Node[]> {
    const data: TreeDataProps = await getMetricTreeData("/metric_tree.csv");
    return [
    {
        id: '1',
        type: 'data',
        data: {
            title: "Revenue",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_total_revenue, true),
            valueEnd: formatNumber(data.current_total_revenue, true),
            change: formatNumber(data.current_total_revenue - data.previous_total_revenue, true)
        },
        position: {x: 0, y: 0}
    },
    {
        id: '2a',
        type: 'data',
        data: {
            title: "1st Appointments Revenue", 
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_first_revenue, true),
            valueEnd: formatNumber(data.current_first_revenue, true),
            change: formatNumber(data.current_first_revenue - data.previous_first_revenue, true)
        },
        position: {x: -450, y: 450}
    },
    {
        id: '3a',
        type: 'data',
        data: {
            title: "1st Appointments",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_first_appointment, false),
            valueEnd: formatNumber(data.current_first_appointment, false),
            change: formatNumber(data.current_first_appointment - data.previous_first_appointment, false)
        },
        position: {x: -700, y: 900}
    },
    {
        id: '3b',
        type: 'data',
        data: {
            title: "Revenue Per 1st Appointments",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber((data.previous_first_revenue/data.previous_first_appointment), true),
            valueEnd: formatNumber((data.current_first_revenue/data.current_first_appointment), true),
            change: formatNumber((data.current_first_revenue/data.current_first_appointment) - (data.previous_first_revenue/data.previous_first_appointment), true),
        },
        position: {x: -200, y: 900},
    },
    {
        id: '2b',
        type: 'data',
        data: {
            title: "Repeat Appointments Revenue",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_repeat_revenue, true),
            valueEnd: formatNumber(data.current_repeat_revenue, true),
            change: formatNumber(data.current_repeat_revenue - data.previous_repeat_revenue, true)
        },
        position: {x: 450, y: 450}
    },
    {
        id: '3c',
        type: 'data',
        data: {
            title: "Repeat Appointments",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber(data.previous_repeat_appointment, false),
            valueEnd: formatNumber(data.current_repeat_appointment, false),
            change: formatNumber(data.current_repeat_appointment - data.previous_repeat_appointment, false)
        },
        position: {x: 200, y: 900}
    },
    {
        id: '3d',
        type: 'data',
        data: {
            title: "Revenue Per Repeat Appointments",
            start_month: data.previous_month,
            end_month: data.current_month,
            year: data.year,
            valueStart: formatNumber((data.previous_repeat_revenue/data.previous_repeat_appointment), true),
            valueEnd: formatNumber((data.current_repeat_revenue/data.current_repeat_appointment), true),
            change: formatNumber((data.current_repeat_revenue/data.current_repeat_appointment) - (data.previous_repeat_revenue/data.previous_repeat_appointment), true),
        },
        position: {x: 700, y: 900}
    },
    ]};

    export async function generateMetricTreeConnections(): Promise<Edge[]> {
        return [
            { id: '2a->1', type: 'simplebezier', source: '1', target: '2a', markerStart: {type: MarkerType.ArrowClosed, height: 30, width: 30} },
            { id: '2b->1', type: 'simplebezier', source: '1', target: '2b', markerStart: {type: MarkerType.ArrowClosed, height: 30, width: 30} },
            { id: '3a->2a', type: 'simplebezier', source: '2a', target: '3a', markerStart: {type: MarkerType.ArrowClosed, height: 30, width: 30} },
            { id: '3b->2a', type: 'simplebezier', source: '2a', target: '3b', markerStart: {type: MarkerType.ArrowClosed, height: 30, width: 30} },
            { id: '3c->2b', type: 'simplebezier', source: '2b', target: '3c', markerStart: {type: MarkerType.ArrowClosed, height: 30, width: 30} },
            { id: '3d->2b', type: 'simplebezier', source: '2b', target: '3d', markerStart: {type: MarkerType.ArrowClosed, height: 30, width: 30} },
          ];
    };