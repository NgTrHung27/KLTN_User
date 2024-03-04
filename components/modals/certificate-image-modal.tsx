"use client";

import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEdgeStore } from "@/lib/edgestore";

interface CertificateImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileChange: (url: string) => void;
}

export const CertificateImageModal = ({
  isOpen,
  onClose,
  onFileChange,
}: CertificateImageModalProps) => {
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();

  const [isUploading, setIsUploading] = useState(false);

  const onSelect = (file?: File) => {
    setFile(file);
  };

  const onUpload = async () => {
    setIsUploading(true);
    if (file) {
      const res = await edgestore.publicFiles
        .upload({ file })
        .finally(() => setIsUploading(false));

      if (res) {
        onFileChange(res.url);
        onClose();
      }
    }
    setIsUploading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
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
          onSelect={(file) => onSelect(file)}
        />
        <ModalFooter>
          <Button
            onClick={onUpload}
            isDisabled={!file ? true : false || isUploading}
            variant="shadow"
            color="primary"
            className="w-full"
          >
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
