"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

interface DobInputProps {
  value: Date;
  isLoading: boolean;
  errorMessage?: string;
  isInvalid: boolean;
  onSelectionChange: (e?: Date) => void;
}

export const DobInput = ({
  value,
  isLoading,
  errorMessage,
  isInvalid,
  onSelectionChange,
}: DobInputProps) => {
  const oldestMonth = new Date("1970-01-01");
  const latestMonth = new Date("2006-12-01");

  const [month, setMonth] = useState<Date>(new Date(latestMonth));

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
    <Popover placement="right" showArrow offset={10} backdrop="transparent">
      <PopoverTrigger>
        <Input
          readOnly
          value={format(value, "dd MMMM, yyyy", {
            locale: vi,
          })}
          isDisabled={isLoading}
          label="Date of birth"
          labelPlacement="outside"
          variant="bordered"
          size="md"
          startContent={<Calendar className="size-4" />}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          isRequired
        />
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <DayPicker
          selected={value}
          onSelect={onSelectionChange}
          mode="single"
          month={month}
          captionLayout="dropdown-buttons"
          showOutsideDays
          fixedWeeks
          fromYear={1970}
          toYear={2006}
          footer={footer}
          onMonthChange={setMonth}
          locale={vi}
          classNames={{
            table: "w-full mx-auto",
            caption_dropdowns: "text-primary",
            caption_label: "hidden",
            nav: "text-primary",
            cell: "text-primary",
            dropdown:
              "relative z-1 inline-flex items-center m-0 p-2 whitespace-nowrap text-priamry border-2 border-transparent text-lg font-bold dark:bg-[#18181b]",
            head_row: "text-primary",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
