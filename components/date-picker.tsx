"use client";

import * as React from "react";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

export interface DatePickerProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder,
  disabled,
  ...props
}: DatePickerProps & React.HTMLAttributes<HTMLDivElement>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleOnSelect: SelectSingleEventHandler = (date) => {
    onDateChange(date);
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(props.className, !date && "text-muted-foreground")}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "yyyy-MM-dd")
          ) : (
            <span>{placeholder || "請選擇日期"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={1945}
          toYear={2010}
          locale={zhTW}
          defaultMonth={date || new Date(1990, 0, 1)}
          selected={date}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
