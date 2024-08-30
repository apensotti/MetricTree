import React, { useEffect } from 'react'

import { DateRange } from 'react-day-picker'
import { CheckboxDropdown } from '../ui/custom-ui/DropdownCheckbox'
import { DateRangeDaily } from '../ui/custom-ui/DateRangeDaily'
import { Dropdown } from '../ui/custom-ui/DropdownBasic'
import { DateRangeMonthly } from '../ui/custom-ui/DateRangeMonthly'
import { DropdownMultiSelect } from '../ui/custom-ui/DropdownMultiSelect'

import { extractUniqueValues } from '@/data/parseData'
import { types } from '@/data/parseData'

import { FilterPanelProps } from '@/data/props'
import { DateRangeWeekly } from '../ui/custom-ui/DateRangeWeekly'
import { DateRangeMonthly2 } from '../ui/custom-ui/DateRangeMonthly copy'
import { DateRangeYearly } from '../ui/custom-ui/DateRangeYearly'
import { Switch } from '../ui/switch'
import { Badge } from '../ui/badge'

const FilterPanel2 = ({
    setDateRange,
    range,
    setMarket, 
    market, 
    setChannel, 
    channel, 
    setStrategy, 
    strategy, 
    setPlatform, 
    platform, 
    setChannelType, 
    channelType, data }: FilterPanelProps) => {

    const [grain, setGrain] = React.useState<string>("Day")
    const [isSwitchChecked, setIsSwitchChecked] = React.useState(false);
    const [filters, setFilters] = React.useState<string[]>([])
    const [dropdownOptions, setDropdownOptions] = React.useState<types>({
        market: [],
        channel: [],
        strategy: [],
        platform: [],
        channel_type: []
    })
    
    useEffect(() => {
        async function fetchUniqueValues() {
            const uniqueValues = await extractUniqueValues();
            setDropdownOptions(uniqueValues);
        }
        fetchUniqueValues();
    }, [])

    useEffect(() => {
        if (!filters.includes("Market")) {
            setMarket(dropdownOptions.market.map(option => option.value));
        }
        if (!filters.includes("Channel")) {
            setChannel(dropdownOptions.channel.map(option => option.value));
        }
        if (!filters.includes("Channel Type")) {
            setChannelType(dropdownOptions.channel_type.map(option => option.value));
        }
        if (!filters.includes("Platform")) {
            setPlatform(dropdownOptions.platform.map(option => option.value));
        }
        if (!filters.includes("Strategy")) {
            setStrategy(dropdownOptions.strategy.map(option => option.value));
        }
    }, [filters, dropdownOptions, setMarket, setChannel, setChannelType, setPlatform, setStrategy]);

    const renderFilterComponent = (filter: string) => {
        switch (filter) {
            case "Market":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={dropdownOptions.market}
                        checkedValues={market}
                        setCheckedValues={setMarket}
                    />
                );
            case "Channel":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={dropdownOptions.channel}
                        checkedValues={channel}
                        setCheckedValues={setChannel}
                    />
                );
            case "Channel Type":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={dropdownOptions.channel_type}
                        checkedValues={channelType}
                        setCheckedValues={setChannelType}
                    />
                );
            case "Platform":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={dropdownOptions.platform}
                        checkedValues={platform}
                        setCheckedValues={setPlatform}
                    />
                );
            case "Strategy":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={dropdownOptions.strategy}
                        checkedValues={strategy}
                        setCheckedValues={setStrategy}
                    />
                );
            default:
                return null;
        }
    };

    const renderGrainComponent = (grain: string) => {
        switch (grain) {
            case "Day":
                return isSwitchChecked ? (
                    <DateRangeDaily setDateRange={setDateRange} range={range} />
                ) : (
                    <DateRangeDaily setDateRange={setDateRange} range={range} />
                );
            case "Month":
                return isSwitchChecked ? (
                    <DateRangeMonthly2 />
                ) : (
                    <DateRangeMonthly setDateRange={setDateRange} range={range}/>
                );
            case "Year":
                return isSwitchChecked ? (
                    <DateRangeYearly />
                ) : (
                    <DateRangeYearly />
                );
            default:
                return null;
        }
    }

    const grainOptions = [
        { value: "Day", label: "Day" },
        { value: "Month", label: "Month" },
        { value: "Year", label: "Year" },
    ]

    const formatDate = (dateString: string | Date) => {
        if (!dateString) {
            return "Invalid Date";
        }
    
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
    
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
        return formatter.format(date);
    }

    return (
        <div className='flex justify-between gap-4'>
            <div className='w-72 border border-gray-800 rounded-sm backdrop-blur-md bg-slate/30 p-4'>
                <div className='flex'>
                    <div className='p-2 pt-0'>
                        <h1 className='text-white text-xs pr-4 font-bold pl-1'>Range A:</h1>
                        <Badge variant={'secondary'}>{formatDate(data.range1_start_date instanceof Date ? formatDate(data.range1_start_date.toISOString()) : formatDate(data.range1_start_date))} - {formatDate(data.range1_end_date instanceof Date ? formatDate(data.range1_end_date.toISOString()) : formatDate(data.range1_end_date))}</Badge>
                    </div>
                    <div className='p-2 pt-0'>
                        <h1 className='text-white text-xs pr-4 font-bold pl-1'>Range B:</h1>
                        <Badge variant={'secondary'}>{formatDate(data.range2_start_date instanceof Date ? formatDate(data.range2_start_date.toISOString()) : formatDate(data.range2_start_date))} - {formatDate(data.range2_end_date instanceof Date ? formatDate(data.range2_end_date.toISOString()) : formatDate(data.range2_end_date))}</Badge>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h1 className="text-white pb-2 text-md font-bold">Date</h1>
                        <div className='flex justify-evenly gap-4'>
                            <Dropdown optionsList={grainOptions} setOption={setGrain} option={grain}></Dropdown>
                            <div className='flex-row'>
                                <h1 className="text-white pb-1 text-xs font-normal">Compare</h1>
                                <Switch checked={isSwitchChecked} onCheckedChange={setIsSwitchChecked}/>
                            </div>
                        </div>
                    </div>
                    {renderGrainComponent(grain)}
                    <div className='flex justify-between'>
                      <h1 className="text-white pb-2 text-md font-bold">Filters</h1>
                      <DropdownMultiSelect setFilter={setFilters} filters={filters} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        {filters.map(filter => (
                            <div key={filter}>
                                <h1 className="text-white pb-2 text-sm font-normal">{filter}</h1>
                                {renderFilterComponent(filter)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel2
