"use client";

import { useRouter } from "next/navigation";

const ProfileIdPage = ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  const router = useRouter();
  return router.push(`/student/profile/${studentCode}/posts`);
};

export default ProfileIdPage;
