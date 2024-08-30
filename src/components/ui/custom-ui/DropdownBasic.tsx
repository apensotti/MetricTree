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
  optionsList: {
    value: string;
    label: string;
  }[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
  option: string | undefined;
}

export function Dropdown({optionsList, setOption, option}: DropdownProps) {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="w-5/6 justify-between mt-1">
        {option || "Select"}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {optionsList.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value} onClick={() => setOption(option.value)}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
