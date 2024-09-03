"use client"

import React, { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@radix-ui/react-icons"
import { format, setMonth } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface YearMonthRangePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
}

export function DateRangeMonthly2({ className }: YearMonthRangePickerProps) {
  const [startYear, setStartYear] = useState(new Date().getFullYear())
  const [selectedMonths, setSelectedMonths] = useState<{ first?: { year: number; month: number }, second?: { year: number; month: number } }>({})

  const months = Array.from({ length: 12 }, (_, index) =>
    format(setMonth(new Date(), index), "MMM")
  )

  const handleMonthSelect = (year: number, month: number) => {
    if (!selectedMonths.first || (selectedMonths.first && selectedMonths.second)) {
      setSelectedMonths({ first: { year, month }, second: undefined })
    } else if (selectedMonths.first) {
      setSelectedMonths({ ...selectedMonths, second: { year, month } })
    }
  }

  const handlePreviousYear = () => {
    setStartYear(startYear - 1)
  }

  const handleNextYear = () => {
    setStartYear(startYear + 1)
  }

  const isMonthSelected = (year: number, month: number) => {
    if (!selectedMonths.first) return false
    return (selectedMonths.first.year === year && selectedMonths.first.month === month) ||
      (selectedMonths.second && selectedMonths.second.year === year && selectedMonths.second.month === month)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="year-month-range"
            variant={"secondary"}
            className={cn(
              "w-7/8 justify-start text-left font-normal",
              !selectedMonths.first && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedMonths.first ? (
              selectedMonths.second ? (
                <>
                  {format(new Date(selectedMonths.first.year, selectedMonths.first.month), "MMM yyyy")},{" "}
                  {format(new Date(selectedMonths.second.year, selectedMonths.second.month), "MMM yyyy")}
                </>
              ) : (
                format(new Date(selectedMonths.first.year, selectedMonths.first.month), "MMM yyyy")
              )
            ) : (
              <span>Select two months</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={handlePreviousYear}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex-1 grid grid-cols-2 gap-8">
              <div className="text-center">
                <span className="text-lg font-medium">{startYear}</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-medium">{startYear + 1}</span>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={handleNextYear}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <Button
                  key={`${startYear}-${index}`}
                  variant={isMonthSelected(startYear, index) ? "default" : "secondary"}
                  onClick={() => handleMonthSelect(startYear, index)}
                >
                  {month}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <Button
                  key={`${startYear + 1}-${index}`}
                  variant={isMonthSelected(startYear + 1, index) ? "default" : "secondary"}
                  onClick={() => handleMonthSelect(startYear + 1, index)}
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
