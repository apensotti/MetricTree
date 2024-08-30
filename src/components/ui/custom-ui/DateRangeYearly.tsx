"use client"

import React, { useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface YearRangePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
}

export function DateRangeYearly({ className }: YearRangePickerProps) {
  const currentYear = new Date().getFullYear()
  const [selectedRange, setSelectedRange] = useState<{ from?: number, to?: number }>({})

  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => 2000 + index)

  const handleYearSelect = (year: number) => {
    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: year, to: undefined })
    } else if (selectedRange.from) {
      if (year < selectedRange.from) {
        setSelectedRange({ from: year, to: selectedRange.from })
      } else {
        setSelectedRange({ ...selectedRange, to: year })
      }
    }
  }

  const isYearSelected = (year: number) => {
    if (!selectedRange.from) return false
    if (selectedRange.to) {
      return year >= selectedRange.from && year <= selectedRange.to
    }
    return selectedRange.from === year
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="year-range"
            variant={"secondary"}
            className={cn(
              "w-7/8 justify-start text-left font-normal",
              !selectedRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRange.from ? (
              selectedRange.to ? (
                `${selectedRange.from} - ${selectedRange.to}`
              ) : (
                `${selectedRange.from}`
              )
            ) : (
              <span>Select a year range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="grid grid-cols-5 gap-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={isYearSelected(year) ? "default" : "secondary"}
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
