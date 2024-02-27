"use client";

import { Input } from "@nextui-org/react";
import { Tag } from "lucide-react";

interface NameInputProps {
  isLoading: boolean;
  isInvalid: boolean;
  errorMessage?: string;
  onValueChange: (e: string) => void;
  field: any;
}

export const NameInput = ({
  isLoading,
  isInvalid,
  errorMessage,
  onValueChange,
  field,
}: NameInputProps) => {
  return (
    <Input
      isDisabled={isLoading}
      label="Fullname"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Enter your fullname"
      startContent={<Tag className="size-4" />}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      isClearable
      onValueChange={onValueChange}
      {...field}
    />
  );
};
