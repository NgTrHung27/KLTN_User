"use client";

import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";

interface CertificateImageModalProps {
  onUpload: () => void;
  isOpen: boolean;
  isUploading: boolean;
  onOpenChange: () => void;
}

export const CertificateImageModal = ({
  onUpload,
  isOpen,
  isUploading,
  onOpenChange,
}: CertificateImageModalProps) => {
  const [file] = useState<File>();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-center text-lg font-semibold text-primary">
            {" "}
            Certificate Image
          </h2>
        </ModalHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isUploading}
          value={file}
          onUpload={onUpload}
        />
      </ModalContent>
    </Modal>
  );
};
