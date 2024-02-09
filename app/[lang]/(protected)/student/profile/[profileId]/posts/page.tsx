"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfilePostEditor } from "./_components/profile-post-editor";
import { useDisclosure } from "@nextui-org/react";
import { ProfilePostModal } from "@/components/modals/profile-post-modal";

const ProfileIdPostPage = () => {
  const user = useCurrentUser();

  const profile = user?.profile;

  const posts = profile?.posts;

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ProfilePostModal
        name={user?.name!}
        logo={user?.image as string | undefined}
        isOpen={isOpen}
        onClose={onClose}
      />
      <div className="flex flex-col gap-4 text-primary">
        <ProfilePostEditor
          onOpen={onOpen}
          logo={user?.image as string | undefined}
        />
        {posts?.length == 0 && <div>No posts found</div>}
      </div>
    </>
  );
};

export default ProfileIdPostPage;
