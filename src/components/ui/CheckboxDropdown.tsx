"use client"

import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"

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

interface CheckboxDropdownProps {
  options: {
    value: string;
    label: string;
  }[],
  setCheckedValues: React.Dispatch<React.SetStateAction<string[]>>;
  checkedValues: string[];
}

export function CheckboxDropdown({options, setCheckedValues, checkedValues}: CheckboxDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const handleCheckboxChange = (value: string) => {
    setCheckedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  const handleSelectAll = () => {
    if (checkedValues.length === options.length) {
      setCheckedValues([])
    } else {
      setCheckedValues(options.map((option) => option.value))
    }
  }

  const selectedLabel = checkedValues.length > 0
    ? (() => {
        const joinedValues = checkedValues.join(", ");
        return joinedValues.length > 21
          ? `${joinedValues.slice(0, 21)}...`
          : joinedValues;
      })()
    : "Select";

    const isAllSelected = checkedValues.length === (options.length || 0);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className="w-5/6 justify-between truncate"
            style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {selectedLabel}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-56 p-0 bg-primary">
          <Command>
            <CommandInput placeholder={`Search ${selectedLabel}...`} className="h-9" />
            <CommandList>
              <CommandItem
                key="select-all"
                value="select-all"
                onSelect={handleSelectAll}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {isAllSelected ? "Deselect All" : "Select All"}
                  </label>
                </div>
              </CommandItem>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={option.label}
                        checked={checkedValues.includes(option.value)}
                        onCheckedChange={() => handleCheckboxChange(option.value)}
                      />
                      <label
                        htmlFor={option.label}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
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
