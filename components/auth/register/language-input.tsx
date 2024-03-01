"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { CertificateType } from "@prisma/client";

interface ProgramInputProps {
  field: any;
  onSelectionChange: () => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const LanguageInput = ({
  field,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: ProgramInputProps) => {
  return (
    <Select
      disallowEmptySelection
      items={[CertificateType.IELTS, CertificateType.TOEFL]}
      isDisabled={isLoading}
      label="Certificate"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      aria-label="Choose a certificate"
      placeholder="Choose a certificate"
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      onSelectionChange={onSelectionChange}
      selectedKeys={[value]}
      classNames={{
        listbox: "text-primary",
      }}
      {...field}
    >
      <SelectItem key={CertificateType.IELTS}>IELTS</SelectItem>
      <SelectItem key={CertificateType.TOEFL}>TOEFL</SelectItem>
    </Select>
  );
};
