"use client";

import { Radio, RadioGroup } from "@nextui-org/react";
import { Gender } from "@prisma/client";

interface GenderInputProps {
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
  onValueChange: (e: boolean) => void;
  field: any;
}

export const GenderInput = ({
  isLoading,
  value,
  errorMessage,
  isInvalid,
  onValueChange,
  field,
}: GenderInputProps) => {
  return (
    <RadioGroup
      orientation="horizontal"
      isDisabled={isLoading}
      label="Gender"
      size="md"
      defaultValue={value}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      classNames={{
        label: "text-sm text-primary",
      }}
      onValueChange={onValueChange}
      {...field}
    >
      <Radio value={Gender.MALE}>Male</Radio>
      <Radio value={Gender.FEMALE}>Female</Radio>
    </RadioGroup>
  );
};
