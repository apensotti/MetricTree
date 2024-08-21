import React, { useEffect } from 'react'

import { DateRange } from 'react-day-picker'
import { CheckboxDropdown } from '../ui/CheckboxDropdown'
import { DailyDateSelection } from '../ui/DailyDateSelection'
import { MultiSelect } from '../ui/MultiSelect'

interface FilterPanelProps {
    setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
    date: DateRange | undefined;
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
}

import { extractUniqueValues } from '@/data/parseData'
import { types } from '@/data/parseData'

const FilterPanel2 = ({ setDateRange, 
        date, 
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
    const [filters, setFilters] = React.useState<string[]>([])
    const [types, setTypes] = React.useState<types>({
        market: [],
        channel: [],
        strategy: [],
        platform: [],
        channel_type: []
    })
    
    useEffect(() => {
        async function fetchUniqueValues() {
            const uniqueValues = await extractUniqueValues();
            setTypes(uniqueValues);
        }
        fetchUniqueValues();
    }, [])

    useEffect(() => {
        if (!filters.includes("Market")) {
            setMarket(types.market.map(option => option.value));
        }
        if (!filters.includes("Channel")) {
            setChannel(types.channel.map(option => option.value));
        }
        if (!filters.includes("Channel Type")) {
            setChannelType(types.channel_type.map(option => option.value));
        }
        if (!filters.includes("Platform")) {
            setPlatform(types.platform.map(option => option.value));
        }
        if (!filters.includes("Strategy")) {
            setStrategy(types.strategy.map(option => option.value));
        }
    }, [filters, types, setMarket, setChannel, setChannelType, setPlatform, setStrategy]);

    const renderFilterComponent = (filter: string) => {
        switch (filter) {
            case "Market":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={types.market}
                        checkedValues={market}
                        setCheckedValues={setMarket}
                    />
                );
            case "Channel":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={types.channel}
                        checkedValues={channel}
                        setCheckedValues={setChannel}
                    />
                );
            case "Channel Type":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={types.channel_type}
                        checkedValues={channelType}
                        setCheckedValues={setChannelType}
                    />
                );
            case "Platform":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={types.platform}
                        checkedValues={platform}
                        setCheckedValues={setPlatform}
                    />
                );
            case "Strategy":
                return (
                    <CheckboxDropdown
                        key={filter}
                        options={types.strategy}
                        checkedValues={strategy}
                        setCheckedValues={setStrategy}
                    />
                );
            default:
                return null;
        }
    };


    return (
        <div className='w-72 border border-gray-800 rounded-sm backdrop-blur-md bg-slate/30 p-4'>
            <div className="flex flex-col space-y-4">
                <div>
                    <h1 className="text-white pb-2 text-sm font-semibold">Time Range</h1>
                    <div className="flex justify-between">
                        <DailyDateSelection setDateRange={setDateRange} date={date}/>
                    </div>
                </div>
                <div className='flex justify-between'>          
                  <h1 className="text-white pb-2 text-sm font-semibold">Filters</h1>
                  <MultiSelect setFilter={setFilters} filters={filters} />
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
