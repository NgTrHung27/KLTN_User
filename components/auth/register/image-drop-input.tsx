"use client";

import { CertificateImageModal } from "@/components/modals/certificate-image-modal";
import { Input, useDisclosure } from "@nextui-org/react";
import { File } from "lucide-react";

interface ImageDropInputProps {
  field: any;
  errorMessage?: string;
  isInvalid: boolean;
  onFileChange: (url: string) => void;
}

export const ImageDropInput = ({
  field,
  errorMessage,
  isInvalid,
  onFileChange,
}: ImageDropInputProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Input
        {...field}
        onClick={onOpen}
        role="button"
        value="Upload an image"
        readOnly={true}
        label="Image Url"
        labelPlacement="outside"
        size="md"
        variant="faded"
        startContent={<File className="mr-2 size-4" />}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        classNames={{
          input: "cursor-default",
        }}
      />
      <CertificateImageModal
        isOpen={isOpen}
        onClose={onClose}
        onFileChange={onFileChange}
      />
    </>
  );
};
