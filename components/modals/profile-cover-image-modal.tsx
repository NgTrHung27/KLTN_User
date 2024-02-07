"use client";

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { SingleImageDropzone } from "../single-image-dropzone";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { uploadProfileCoverImage } from "@/actions/profile-image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileCoverImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentCode: string;
  imageUrl?: string | undefined;
}

export const ProfileCoverImageModal = ({
  isOpen,
  onClose,
  studentCode,
  imageUrl,
}: ProfileCoverImageModalProps) => {
  const router = useRouter();

  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(imageUrl);
  const { edgestore } = useEdgeStore();

  const clearImage = () => {
    setImage(undefined);
  };

  const onUpload = (file: File | undefined) => {
    setFile(file);
  };

  const onPress = async () => {
    if (file) {
      setIsLoading(true);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: imageUrl ?? undefined,
        },
      });

      startTransition(() => {
        uploadProfileCoverImage(studentCode, res.url).then((res) => {
          if (res.error) {
            toast.error(res.error);
          }
          if (res.success) {
            toast.success(res.success);
            onClose();
            router.refresh();
          }
        });
      });

      setFile(undefined);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-primary">
            Upload your new profile cover image
          </h2>
          <p className="text-xs text-muted-foreground">
            16:9 image resolution is recommended
          </p>
        </ModalHeader>
        <ModalBody className="relative">
          {image ? (
            <>
              <Image src={image} alt="profile cover image" />
              <X
                onClick={clearImage}
                className="absolute right-3 top-0 z-10 rounded-full bg-rose-500/30 text-primary text-rose-500 hover:cursor-pointer"
              />
            </>
          ) : (
            <SingleImageDropzone
              disabled={isLoading}
              className="w-full outline-none"
              value={file}
              onUpload={onUpload}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={isLoading}
            color="danger"
            variant="light"
            onPress={onClose}
          >
            Close
          </Button>
          {file && !image && (
            <Button isDisabled={isLoading} color="primary" onPress={onPress}>
              Upload
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
