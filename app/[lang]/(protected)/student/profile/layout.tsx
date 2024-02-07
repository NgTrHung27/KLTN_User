"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfileSidebar } from "./_components/profile-sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();

  const school = user?.school;

  return (
    <div className="hidden h-full w-full gap-3 rounded-lg bg-slate-100 p-8 text-primary dark:bg-background md:grid md:grid-cols-[70px_repeat(11,_1fr)]">
      {/* SIDEBAR */}
      <div className="col-span-1 grid auto-rows-min gap-3 text-primary lg:col-span-3">
        <ProfileSidebar schoolName={school!.name} user={user!} />
      </div>
      {children}
    </div>
  );
};

export default ProfileLayout;
