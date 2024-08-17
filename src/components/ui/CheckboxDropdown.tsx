"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "Texas",
    label: "Texas",
  },
  {
    value: "New York",
    label: "New York",
  },
  {
    value: "Colorado",
    label: "Colorado",
  },
  {
    value: "DMV",
    label: "DMV",
  },
  {
    value: "Unknown",
    label: "Unknown",
  },
]

export function CheckboxDropdown() {
  const [open, setOpen] = React.useState(false)
  const [checkedValue, setCheckedValue] = React.useState({})

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-5/6 justify-between"
        >
          Select
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-56 p-0 bg-primary">
        <Command>
          <CommandInput placeholder="Search market..." className="h-9 " />
          <CommandList>
            <CommandEmpty>No market found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setOpen(true)
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={framework.label}/>
                      <label
                          htmlFor={framework.label}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                      {framework.label}
                      </label>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
