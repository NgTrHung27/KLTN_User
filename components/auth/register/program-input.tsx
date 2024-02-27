"use client";

import { Image, Select, SelectItem } from "@nextui-org/react";

interface ProgramInputProps {
  field: any;
  programs: { name: string }[];
  onSelectionChange: () => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const ProgramInput = ({
  field,
  programs,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: ProgramInputProps) => {
  return (
    <Select
      {...field}
      onSelectionChange={onSelectionChange}
      disallowEmptySelection
      items={programs}
      isDisabled={isLoading}
      label="Program"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      aria-label="Choose a program"
      placeholder="Choose a program"
      errorMessage={errorMessage}
      isInvalid={isInvalid}
    >
      {programs.map((program) => (
        <SelectItem key={program.name}>{program.name}</SelectItem>
      ))}
    </Select>
  );
};
