"use client";

import { useCertificateImage } from "@/hooks/use-certificate-image";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

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
  const [file, setFile] = useState<File>();

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
