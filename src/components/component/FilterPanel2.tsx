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
    channelType }: FilterPanelProps) => {

    const [grain, setGrain] = React.useState<string>("Day")
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
                return (
                    <DateRangeDaily setDateRange={setDateRange} range={range}/>
                );
            case "Month":
                return (
                    <DateRangeMonthly2/>
                );
            case "Year":
                return (
                    <DateRangeWeekly setDateRange={setDateRange} date={range}/>
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

    return (
        <div className='w-72 border border-gray-800 rounded-sm backdrop-blur-md bg-slate/30 p-4'>
            <div className="flex flex-col space-y-4">
                <div>
                    <h1 className="text-white pb-2 text-md font-semibold">Grain</h1>
                    <Dropdown optionsList={grainOptions} setOption={setGrain} option={grain}></Dropdown>
                </div>
                {renderGrainComponent(grain)}
                <div className='flex justify-between'>
                  <h1 className="text-white pb-2 text-md font-semibold">Filters</h1>
                  <DropdownMultiSelect setFilter={setFilters} filters={filters} />
                </div>
                <div className="flex flex-col space-y-2">
                    {filters.map(filter => (
                        <div key={filter}>
                            <h1 className="text-white pb-2 text-sm font-semibold">{filter}</h1>
                            {renderFilterComponent(filter)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilterPanel2
