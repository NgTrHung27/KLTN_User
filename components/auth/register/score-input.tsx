"use client";

import { Radio, RadioGroup } from "@nextui-org/react";
import { GradeType } from "@prisma/client";

interface ScoreInputProps {
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
  onValueChange: (e: boolean) => void;
  field: any;
}

export const ScoreInput = ({
  isLoading,
  value,
  errorMessage,
  isInvalid,
  onValueChange,
  field,
}: ScoreInputProps) => {
  return (
    <RadioGroup
      orientation="horizontal"
      isDisabled={isLoading}
      label="Overall Score"
      size="md"
      defaultValue={value}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      classNames={{
        label: "text-sm text-primary",
        wrapper: "gap-x-4",
      }}
      onValueChange={onValueChange}
      {...field}
    >
      <Radio value={GradeType.GPA}>GPA (?/4.0)</Radio>
      <Radio value={GradeType.CGPA}>CGPA (?/10.0)</Radio>
    </RadioGroup>
  );
};
