"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

interface DatePickerProps {
  onDaySelected: (day: Date | undefined) => void;
  defaultMonth: Date | undefined;
}

export const DatePicker = ({
  onDaySelected,
  defaultMonth,
}: DatePickerProps) => {
  const oldestMonth = new Date("1970-01-01");
  const latestMonth = new Date("2006-12-01");
  const [month, setMonth] = useState<Date>(
    new Date(defaultMonth ?? "2006-01-01"),
  );

  const footer = (
    <div className="mt-4 flex items-center justify-between">
      <Button onClick={() => setMonth(oldestMonth)} size="sm">
        Go to oldest
      </Button>
      <Button onClick={() => setMonth(latestMonth)} size="sm">
        Go to latest
      </Button>
    </div>
  );

  return (
    <Popover showArrow offset={10} backdrop="opaque">
      <PopoverTrigger>
        <Calendar role="button" className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <DayPicker
          styles={{
            dropdown: {
              background: "black",
              border: "1px solid black",
            },
            caption: { color: "white" },
            caption_label: {
              background: "#18181b",
            },
          }}
          onSelect={(value) => onDaySelected(value)}
          mode="single"
          month={month}
          captionLayout="dropdown-buttons"
          showOutsideDays
          fixedWeeks
          defaultMonth={defaultMonth}
          fromYear={1970}
          toYear={2006}
          footer={footer}
          onMonthChange={setMonth}
        />
      </PopoverContent>
    </Popover>
  );
};
