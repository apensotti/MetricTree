
// parseData.ts

//raw data from csv
export interface RawDataProps {
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

//parsed props/attributes from raw data
export interface ParsedProps {
    date: Date;
    market: string;
    channel: string;
    channel_type: string;
    strategy: string;
    platform: string;
    first_appointment: number;
    repeat_appointment: number;
    first_revenue: number;
    repeat_revenue: number;
}

//parsed data for the Metrics in the Tree
export interface TreeDataProps {
    year: number;
    range1_start_date: string | Date;
    range1_end_date: string | Date;
    range1_first_appointment: number;
    range1_repeat_appointment: number;
    range1_first_revenue: number;
    range1_repeat_revenue: number;
    range1_total_revenue: number;
    range1_total_appointments: number;
    range2_start_date: string| Date;
    range2_end_date: string| Date;
    range2_first_appointment: number;
    range2_repeat_appointment: number;
    range2_first_revenue: number;
    range2_repeat_revenue: number;
    range2_total_revenue: number;
    range2_total_appointments: number;
    revenue_total_change: number;
    repeat_appointment_total_change: number; 
    first_appointment_total_change: number;
    first_revenue_total_change: number;
    repeat_revenue_total_change: number;
    first_appointment_per_change: number;
    repeat_appointment_per_change: number;
    repeat_revenue_chart: number[];
    first_revenue_chart: number[];
    total_revenue_chart: number[];
    repeat_appoitnment_chart: number[];
    first_appointment_chart: number[];
    repeat_appointment_per_chart: number[];
    first_appointment_per_chart: number[];
}

// UI

export interface DoubleDateRange {
  range1: {
    from: Date | undefined;
    to: Date | undefined;
  };
  range2: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

// FilterPanel2.tsx

export interface FilterPanelProps {
    setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
    range: DateRange | undefined;
    setDateRanges: React.Dispatch<React.SetStateAction<DoubleDateRange>>;
    ranges: DoubleDateRange;
    setMarket: React.Dispatch<React.SetStateAction<string[]>>;
    market: string[];
    setChannel: React.Dispatch<React.SetStateAction<string[]>>;
    channel: string[];
    setStrategy: React.Dispatch<React.SetStateAction<string[]>>;
    strategy: string[];
    setPlatform: React.Dispatch<React.SetStateAction<string[]>>;
    platform: string[];
    setChannelType: React.Dispatch<React.SetStateAction<string[]>>;
    channelType: string[];
    data: TreeDataProps;
    isSwitchChecked: boolean;
    setIsSwitchChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

// DailyRangeSelection.tsx

export interface CalendarProps {
    className?: React.HTMLAttributes<HTMLDivElement>
    setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
    range: DateRange | undefined;
  }

// DropdownCheckbox.tsx
export interface CheckboxDropdownProps {
  options: {
    value: string;
    label: string;
  }[],
  setCheckedValues: React.Dispatch<React.SetStateAction<string[]>>;
  checkedValues: string[];
}