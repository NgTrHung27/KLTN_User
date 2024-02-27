"use client";

import { Input } from "@nextui-org/react";
import { Mail } from "lucide-react";

interface EmailInputProps {
  isLoading: boolean;
  isInvalid: boolean;
  errorMessage?: string;
  onValueChange: (e: string) => void;
  field: any;
}

export const EmailInput = ({
  isLoading,
  isInvalid,
  errorMessage,
  onValueChange,
  field,
}: EmailInputProps) => {
  return (
    <Input
      isDisabled={isLoading}
      label="Email"
      labelPlacement="outside"
      type="email"
      variant="bordered"
      size="md"
      placeholder="Enter your email"
      startContent={<Mail className="size-4" />}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      isClearable
      onValueChange={onValueChange}
      {...field}
    />
  );
};
