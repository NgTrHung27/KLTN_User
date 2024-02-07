"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfileHeader } from "./_components/profile-header";
import { useRouter } from "next/navigation";

const ProfileIdLayout = ({
  children,
  params: { profileId },
}: {
  children: React.ReactNode;
  params: { profileId: string };
}) => {
  const router = useRouter();

  const user = useCurrentUser();
  const school = user?.school;
  const profile = user?.profile;

  if (!user?.studentCode.match(profileId)) {
    return (
      <div className="col-span-11 h-full w-full bg-white text-primary dark:bg-background lg:col-span-9">
        Another user
      </div>
    );
  }

  return (
    <div className="col-span-11 grid gap-3 lg:col-span-9 lg:grid-cols-7">
      <div className="items-ceneter flex flex-col justify-start gap-3 lg:col-span-5">
        <ProfileHeader
          name={user.name!}
          coverUrl={profile?.coverImage as string | undefined}
          logoUrl={user.image as string | undefined}
          schoolName={school!.name}
        />
        {children}
      </div>
      <div className="flex flex-col gap-3 bg-white text-black lg:col-span-2">
        <div className="bg-black text-white">F</div>
        <div className="bg-black text-white">G</div>
      </div>
    </div>
  );
};

export default ProfileIdLayout;
