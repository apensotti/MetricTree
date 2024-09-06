"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "../calendar2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "@/data/props";
import { DoubleDateRange } from "@/data/props";

export function DateRangeDailyCompare({
  className,
  setDateRanges,
  ranges,
}: {
  className?: string;
  setDateRanges: (ranges: DoubleDateRange) => void;
  ranges: DoubleDateRange;
}) {
  const handleSelectRange1 = (range: DateRange | undefined) => {
    if (range) {
      setDateRanges({
        range1: range,
        range2: ranges.range2,
      });
    }
  };

  const handleSelectRange2 = (range: DateRange | undefined) => {
    if (range) {
      setDateRanges({
        range1: ranges.range1,
        range2: range,
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date1"
            variant={"secondary"}
            className={cn(
              "w-7/8 justify-start text-left font-normal",
              !ranges?.range1 && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {ranges?.range1?.from ? (
              ranges.range1.to ? (
                <>
                  {format(ranges.range1.from, "LLL dd, y")} -{" "}
                  {format(ranges.range1.to, "LLL dd, y")}
                </>
              ) : (
                format(ranges.range1.from, "LLL dd, y")
              )
            ) : (
              <span>Pick the first range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            onSelectRange1={handleSelectRange1}
            onSelectRange2={handleSelectRange2}
            selectedRanges={ranges}
            numberOfMonths={1}
            mode="range"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
