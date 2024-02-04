"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface ActionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAction: () => void;
  title: string;
  description: string;
  isDismissable?: boolean;
}

export const ActionModal = ({
  isOpen,
  onClose,
  onAction,
  title,
  description,
  isDismissable,
}: ActionModalProps) => {
  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={isDismissable}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-[#7D1F1F] dark:text-primary">
              {title}
            </ModalHeader>
            <ModalBody className="text-primary">{description}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onAction}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
