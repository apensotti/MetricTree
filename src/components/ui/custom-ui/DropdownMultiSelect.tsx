"use client"

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
      value: "Channel",
      label: "Channel",
    },
    {
        value: "Channel Type",
        label: "Channel Type",
    },
    {
      value: "Strategy",
      label: "Strategy",
    },
    {
      value: "Platform",
      label: "Platform",
    },
    {
      value: "Market",
      label: "Market",
    },
  
]

interface MultiSelectProps {
    filters: string[];
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
}

export function DropdownMultiSelect({filters, setFilter}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const toggleSelection = (currentValue: string) => {
    setFilter((prevSelectedValues) => {
      if (prevSelectedValues.includes(currentValue)) {
        return prevSelectedValues.filter((value) => value !== currentValue)
      } else {
        return [...prevSelectedValues, currentValue]
      }
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          size={"sm"}
        >
          +add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 flex ml-28">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => toggleSelection(framework.value)}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      filters.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
