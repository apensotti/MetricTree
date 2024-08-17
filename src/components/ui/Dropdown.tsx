"use client"

import * as React from "react"

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

export function Dropdown() {
  const [position, setPosition] = React.useState("bottom")
  const [selected, setSelected] = React.useState("")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="w-5/6 justify-between">
        {selected || "Select"}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>        
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top" onClick={() => setSelected("Week")}>Week</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom" onClick={() => setSelected("Month")}>Month</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right" onClick={() => setSelected("Year")}>Year</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
