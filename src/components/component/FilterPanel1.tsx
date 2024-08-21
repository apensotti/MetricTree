import React from 'react'

import { DateRange } from 'react-day-picker'
import { CheckboxDropdown } from '../ui/CheckboxDropdown'
import { TwoWeekDateSelection } from '../ui/TwoWeekDateSelection'
import { Dropdown } from '../ui/Dropdown'
import { YearMonthRangePicker } from '../ui/MonthDateSelection'

interface FilterPanelProps {
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  date: DateRange | undefined;
}

const FilterPanel = ({setDateRange, date}: FilterPanelProps) => {
  const [grain, setGrain] = React.useState("Week")

  return (
    <div className='w-72 border border-gray-800 rounded-sm backdrop-blur-md bg-slate/30 p-4'>
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-white pb-2 text-sm font-semibold">Market</h1>
          <CheckboxDropdown />
        </div>
        <div>
          <h1 className="text-white pb-2 text-sm font-semibold">Time Grain</h1>
          <Dropdown setGrain={setGrain} grain={grain} />
        </div>
        <div>
          <h1 className="text-white pb-2 text-sm font-semibold">Time Range</h1>
          <div className="flex justify-between">
            {grain === "Week" ? (
              <TwoWeekDateSelection setDateRange={setDateRange} date={date} />
            ) : (
              <YearMonthRangePicker />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel