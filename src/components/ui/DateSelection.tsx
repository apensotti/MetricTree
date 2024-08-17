"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "./button"
import { Popover,
    PopoverContent,
    PopoverTrigger,
 } from "./popover"

interface DateSelectionProps {
  onDateChange: (date: Date | undefined) => void;
}

export function DateSelection({onDateChange}: DateSelectionProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      onDateChange(date); 
    }, [date, onDateChange]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className="w-5/12 justify-between"
            >
            {date ? date.toDateString().split(' ').slice(1).join(' ') : "Select Date"}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="shadow"
            />
        </PopoverContent>
      </Popover>
    )
}
