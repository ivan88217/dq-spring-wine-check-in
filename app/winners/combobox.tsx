"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export interface ComboboxProps {
  data: {
    value: string;
    label: string;
  }[];
  title: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function Combobox({
  data,
  title,
  value,
  onValueChange,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    onValueChange(selected);
  }, [selected]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between",
            selected ? "" : "text-gray-400"
          )}
        >
          {selected
            ? data.find((row) => row.value === selected)?.label
            : `選擇${title}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`找尋${title}...`} />
          <CommandEmpty>找不到選項</CommandEmpty>
          <CommandGroup>
            {data.map((row) => (
              <CommandItem
                key={row.value}
                value={row.value}
                onSelect={(currentValue) => {
                  setSelected(currentValue === selected ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected === row.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {row.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
