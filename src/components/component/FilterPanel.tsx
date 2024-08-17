import React from 'react'

import { CheckboxDropdown } from '../ui/CheckboxDropdown'
import { DateSelection } from '../ui/DateSelection'
import { Dropdown } from '../ui/Dropdown'

interface FilterPanelProps {
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

const FilterPanel = ({setStartDate, setEndDate}: FilterPanelProps) => {
  return (
    <div className='w-72 border border-gray-800 rounded-sm backdrop-blur-md bg-slate/30 p-4'>
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-white pb-2 text-sm font-semibold">Market</h1>
              <CheckboxDropdown/>          
            </div>
            <div>
              <h1 className="text-white pb-2 text-sm font-semibold">Time Grain</h1>
              <Dropdown/>
            </div>
            <div>
              <h1 className="text-white pb-2 text-sm font-semibold">Time Range</h1>
              <div className='flex justify-between mr-20'>
                <h3 className="text-gray-500 pb-2 text-sm font-semibold">Start</h3>
                <h3 className="text-gray-500 pb-2 text-sm font-semibold">End</h3>
              </div>
              
              <div className="flex justify-between">
                <DateSelection onDateChange={setStartDate}/>
                  <p className="text-white">-</p>
                <DateSelection onDateChange={setEndDate}/>
              </div>
            </div>
          </div>
        </div>
  )
}

export default FilterPanel