"use client";

import { useRouter } from "next/navigation";

const ProfileIdPage = ({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {
  const router = useRouter();
  return router.push(`/student/profile/${profileId}/posts`);
};

export default ProfileIdPage;
