import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { format, setMonth, isBefore, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarProps } from "@/data/props";

export function DateRangeMonthly({ className, setDateRange, range }: CalendarProps) {
  const [startYear, setStartYear] = useState(new Date().getFullYear());

  const months = Array.from({ length: 12 }, (_, index) => format(setMonth(new Date(), index), "MMM"));

  const handleMonthSelect = (year: number, month: number) => {
    const selectedDate = new Date(year, month);
    if (!range?.from || (range.from && range.to)) {
      setDateRange({
        from: startOfMonth(selectedDate),
        to: undefined,
      });
    } else if (range.from) {
      const isFromBeforeTo = isBefore(selectedDate, new Date(range.from));
      if (isFromBeforeTo) {
        setDateRange({
          from: startOfMonth(selectedDate),
          to: endOfMonth(new Date(range.from)),
        });
      } else {
        setDateRange({
          from: range.from,
          to: endOfMonth(selectedDate),
        });
      }
    }
  };

  const handlePreviousYear = () => {
    setStartYear(startYear - 1);
  };

  const handleNextYear = () => {
    setStartYear(startYear + 1);
  };

  const isMonthSelected = (year: number, month: number) => {
    if (!range?.from) return false;
    if (range.to) {
      const startDate = new Date(range.from);
      const endDate = new Date(range.to);
      const currentDate = new Date(year, month);
      return currentDate >= startDate && currentDate <= endDate;
    }
    return new Date(range.from).getFullYear() === year && new Date(range.from).getMonth() === month;
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="year-month-range"
            variant={"secondary"}
            className={cn("w-7/8 justify-start text-left font-normal", !range?.from && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {format(new Date(range.from), "MMM yyyy")} - {format(new Date(range.to), "MMM yyyy")}
                </>
              ) : (
                format(new Date(range.from), "MMM yyyy")
              )
            ) : (
              <span>Select a month range</span>
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
  );
}
