"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format, differenceInCalendarDays } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DateRangeSelectionProps } from "@/data/props"

export function DateRangeDaily({ className, setDateRange, range }: DateRangeSelectionProps) {
  const midpointDate = range?.from && range?.to 
    ? addDays(range.from, Math.floor(differenceInCalendarDays(range.to, range.from) / 2))
    : null

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"secondary"}
            className={cn(
              "w-7/8 justify-start text-left font-normal",
              !range && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, "LLL dd, y")} -{" "}
                  {format(range.to, "LLL dd, y")}
                </>
              ) : (
                format(range.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setDateRange}
            numberOfMonths={2}
            modifiers={{
              midpoint: midpointDate ? [midpointDate] : []
            }}
            modifiersStyles={{
              midpoint: { backgroundColor: "#FFFFFF", color: "#000000", borderRadius: "50%" }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
