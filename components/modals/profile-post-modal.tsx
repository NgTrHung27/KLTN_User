"use client";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ArrowLeft, Globe2, Lock, UserX, Users } from "lucide-react";
import { useState } from "react";
import { ModalPostContent } from "./profile-post/modal-post-content";
import { StatusButton } from "./profile-post/status-button";
import { ModalPostStatusContent } from "./profile-post/modal-post-status-content";

interface ProfilePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  logo: string | undefined;
  name: string;
}

export const Status = {
  PUBLIC: {
    label: "Public",
    icon: <Globe2 className="h-4 w-4" />,
    description: "Anyone who is logged in or not",
  },
  FRIENDS: {
    label: "Only friends",
    icon: <Users className="h-4 w-4" />,
    description: "Only your friends can see this post",
  },
  EXCEPT: {
    label: "Except for",
    icon: <UserX className="h-4 w-4" />,
    description: "Everyone except...",
  },
  PRIVATE: {
    label: "Private",
    icon: <Lock className="h-4 w-4" />,
    description: "Only you can see this post",
  },
};

export const ProfilePostModal = ({
  isOpen,
  onClose,
  logo,
  name,
}: ProfilePostModalProps) => {
  const [status, setStatus] = useState(Status.PUBLIC);
  const [isEditStatus, setIsEditStatus] = useState(false);

  const onEditStatus = (value: boolean) => {
    setIsEditStatus(value);
  };

  const onOpenChange = () => {
    setIsEditStatus(false);
    setStatus(Status.PUBLIC);
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      classNames={{
        closeButton: "z-10",
      }}
    >
      {!isEditStatus && (
        <ModalPostContent
          name={name}
          logo={logo}
          onClick={onEditStatus}
          currentStatus={status}
        />
      )}
      {isEditStatus && (
        <ModalPostStatusContent
          currentStatus={status}
          onClick={setStatus}
          onReturn={onEditStatus}
        />
      )}
    </Modal>
  );
};
