"use client"

import React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, startOfWeek, addWeeks, endOfWeek } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangeSelectionProps {
  className?: React.HTMLAttributes<HTMLDivElement>
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  date: DateRange | undefined;
}

export function TwoWeekDateSelection({className, setDateRange, date}: DateRangeSelectionProps) {

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const from = startOfWeek(range.from)
      const to = endOfWeek(addWeeks(range.to, 1))
      setDateRange({ from, to })
    } else if (range?.from) {
      const from = startOfWeek(range.from)
      const to = endOfWeek(addWeeks(range.from, 1))
      setDateRange({ from, to })
    } else {
      setDateRange(undefined)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"secondary"}
            className={cn(
              "w-7/8 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select a week range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
