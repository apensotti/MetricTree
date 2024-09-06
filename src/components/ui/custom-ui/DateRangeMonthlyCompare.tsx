"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { format, setMonth, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DoubleDateRange } from "@/data/props";

interface YearMonthRangePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  selectedRanges: DoubleDateRange;
  setSelectedRanges: React.Dispatch<React.SetStateAction<DoubleDateRange>>;
}



export function DateRangeMonthly2({ className, selectedRanges, setSelectedRanges }: YearMonthRangePickerProps) {
  const [startYear, setStartYear] = useState(new Date().getFullYear());

  const months = Array.from({ length: 12 }, (_, index) => format(setMonth(new Date(), index), "MMM"));

  const handleMonthSelect = (year: number, month: number) => {
    const selectedMonthStart = startOfMonth(new Date(year, month));
    const selectedMonthEnd = endOfMonth(new Date(year, month));

    // If range1 is not set or range2 is already set, reset and assign to range1
    if (!selectedRanges.range1.from || (selectedRanges.range1.from && selectedRanges.range2.from)) {
      setSelectedRanges({
        range1: { from: selectedMonthStart, to: selectedMonthEnd },
        range2: { from: undefined, to: undefined },
      });
    }
    // If range1 is set and range2 is not set, assign to range2
    else if (selectedRanges.range1.from && !selectedRanges.range2.from) {
      setSelectedRanges((prevRanges) => ({
        ...prevRanges,
        range2: { from: selectedMonthStart, to: selectedMonthEnd },
      }));
    }
  };
  
  const handlePreviousYear = () => {
    setStartYear(startYear - 1);
  };

  const handleNextYear = () => {
    setStartYear(startYear + 1);
  };

  const isMonthSelected = (year: number, month: number) => {
    const selectedMonthStart = startOfMonth(new Date(year, month)).getTime();
    if (selectedRanges.range1.from && selectedRanges.range1.from.getTime() === selectedMonthStart) {
      return true;
    }
    if (selectedRanges.range2.from && selectedRanges.range2.from.getTime() === selectedMonthStart) {
      return true;
    }
    return false;
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="year-month-range"
            variant={"secondary"}
            className={cn(
              "w-7/8 justify-start text-left font-normal",
              !selectedRanges.range1.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRanges.range1.from ? (
              selectedRanges.range2.from ? (
                <>
                  {format(selectedRanges.range1.from, "MMM yyyy")},{" "}
                  {format(selectedRanges.range2.from, "MMM yyyy")}
                </>
              ) : (
                format(selectedRanges.range1.from, "MMM yyyy")
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
  );
}
