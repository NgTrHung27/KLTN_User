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
  posts: ExtendedPost[];
}

export const ProfilePosts = ({ name, image, posts }: ProfilePostProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ProfilePostModal
        name={name}
        logo={image as string | undefined}
        isOpen={isOpen}
        onClose={onClose}
      />
      <div className="flex flex-col gap-4 text-primary">
        <ProfilePostEditor onOpen={onOpen} logo={image as string | undefined} />

        {posts?.length! > 0 && (
          <ProfilePostsList posts={posts || []} name={name} logo={image} />
        )}
      </div>
    </>
  );
};
