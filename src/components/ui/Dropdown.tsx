"use client"

import React from "react"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownProps {
  setGrain: React.Dispatch<React.SetStateAction<string>>;
  grain: string | undefined;
}

export function Dropdown({setGrain, grain}: DropdownProps) {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="w-5/6 justify-between">
        {grain || "Select"}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top" onClick={() => setGrain("Week")}>Week</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom" onClick={() => setGrain("Month")}>Month</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right" onClick={() => setGrain("Year")}>Year</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
