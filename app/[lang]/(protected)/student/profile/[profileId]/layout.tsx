"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfileHeader } from "./_components/profile-header";
import { useRouter } from "next/navigation";
import { ProfileInformation } from "./_components/profile-information";

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
      <div className="hidden gap-3 lg:col-span-2 lg:flex lg:flex-col">
        <ProfileInformation
          address={user.address}
          dob={user.dob}
          schoolLogo={school?.logoUrl!}
          schoolName={school?.name!}
        />
        <div className="bg-black text-white">Friends</div>
      </div>
    </div>
  );
};

export default ProfileIdLayout;
