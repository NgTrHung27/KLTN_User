"use client";

import { Input } from "@nextui-org/react";
import { Phone } from "lucide-react";

interface PhoneInputProps {
  field: any;
  onValueChange: (e: string) => void;
  isLoading: boolean;
  errorMessage?: string;
  isInvalid: boolean;
}

export const PhoneInput = ({
  field,
  onValueChange,
  isLoading,
  errorMessage,
  isInvalid,
}: PhoneInputProps) => {
  return (
    <Input
      isDisabled={isLoading}
      label="Phone Number"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Enter your phone number"
      startContent={<Phone className="size-4" />}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      isClearable
      onValueChange={onValueChange}
      {...field}
    />
  );
};
