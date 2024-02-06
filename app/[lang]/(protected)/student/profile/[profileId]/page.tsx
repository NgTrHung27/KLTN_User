"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfileSidebar } from "../_components/profile-sidebar";

const ProfileUserPage = ({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {
  const user = useCurrentUser();

  if (!user?.studentCode.match(profileId)) {
    return <div className="bg-white dark:bg-background">Another user</div>;
  }

  return (
    <>
      <div className="items-ceneter flex flex-col justify-start gap-3 bg-white text-black lg:col-span-5">
        <div className="bg-black text-white">C</div>
        <div className="bg-black text-white">D</div>
        <div className="bg-black text-white">E</div>
      </div>
      <div className="flex flex-col gap-3 bg-white text-black lg:col-span-2">
        <div className="bg-black text-white">F</div>
        <div className="bg-black text-white">G</div>
      </div>
    </>
  );
};

export default ProfileUserPage;
