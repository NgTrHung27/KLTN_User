"use client";

import { Input } from "@nextui-org/react";
import { Eye, EyeOff, Key, Mail } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  isLoading: boolean;
  isInvalid: boolean;
  errorMessage?: string;
  onValueChange: (e: string) => void;
  field: any;
}

export const PasswordInput = ({
  isLoading,
  isInvalid,
  errorMessage,
  onValueChange,
  field,
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(true);

    setTimeout(() => setIsVisible(false), 1000);
  };

  return (
    <Input
      isDisabled={isLoading}
      label="Password"
      labelPlacement="outside"
      type={isVisible ? "text" : "password"}
      variant="bordered"
      size="md"
      placeholder="Enter your password"
      startContent={<Key className="size-4" />}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      }
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      onValueChange={onValueChange}
      {...field}
    />
  );
};
