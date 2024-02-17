"use client";

import { ProfilePostModal } from "@/components/modals/profile-post-modal";
import { ProfilePostEditor } from "./profile-post-editor";
import { ProfilePostsList } from "./profile-posts-list";
import { User } from "@prisma/client";
import { ExtendedPost } from "@/types";
import { useDisclosure } from "@nextui-org/react";

interface ProfilePostProps {
  name: string;
  image?: string;
}

export const ProfilePosts = ({ name, image }: ProfilePostProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ProfilePostModal
        name={name}
        logo={image || ""}
        isOpen={isOpen}
        onClose={onClose}
      />
      <ProfilePostEditor onOpen={onOpen} logo={image || ""} />
    </>
  );
};
