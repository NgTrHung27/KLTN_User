"use client";

import { Input } from "@nextui-org/react";
import { GradeType } from "@prisma/client";

interface NumberInputProps {
  field: any;
  isLoading: boolean;
  type: GradeType;
  errorMessage?: string;
  isInvalid: boolean;
  onValueChange: () => void;
}

export const NumberInput = ({
  field,
  isLoading,
  type,
  errorMessage,
  isInvalid,
  onValueChange,
}: NumberInputProps) => {
  return (
    <Input
      isDisabled={isLoading}
      defaultValue={"1"}
      type="number"
      min={0}
      max={type === GradeType.GPA ? 4 : 10}
      step={0.1}
      label=""
      labelPlacement="outside"
      variant="bordered"
      size="md"
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      className="w-full max-w-[150px] pt-6"
      onValueChange={onValueChange}
      {...field}
    />
  );
};
