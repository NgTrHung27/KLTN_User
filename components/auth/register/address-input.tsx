"use client";

import { Input } from "@nextui-org/react";
import { Home } from "lucide-react";

interface AddressInputProps {
  isLoading: boolean;
  isInvalid: boolean;
  errorMessage?: string;
  onValueChange: (e: string) => void;
  field: any;
}

export const AddressInput = ({
  field,
  isLoading,
  isInvalid,
  onValueChange,
  errorMessage,
}: AddressInputProps) => {
  return (
    <Input
      isDisabled={isLoading}
      label="Address Line"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Enter your address line"
      startContent={<Home className="size-4" />}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      isClearable
      className="pt-6"
      onValueChange={onValueChange}
      {...field}
    />
  );
};
