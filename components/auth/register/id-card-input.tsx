"use client";

import { Input } from "@nextui-org/react";
import { NotebookText } from "lucide-react";

interface IdCardInputProps {
  field: any;
  onValueChange: (e: string) => void;
  isLoading: boolean;
  errorMessage?: string;
  isInvalid: boolean;
}

export const IdCardInput = ({
  field,
  onValueChange,
  isLoading,
  errorMessage,
  isInvalid,
}: IdCardInputProps) => {
  return (
    <Input
      isDisabled={isLoading}
      label="Identity Card Number"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Enter your identity card number"
      startContent={<NotebookText className="size-4" />}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      isClearable
      onValueChange={onValueChange}
      {...field}
    />
  );
};
