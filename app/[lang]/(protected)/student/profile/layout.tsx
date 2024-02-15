import { getSchoolByUserId } from "@/data/school";
import { currentUser } from "@/lib/user";
import { ProfileSidebar } from "./_components/profile-sidebar";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  const school = await getSchoolByUserId(user?.id!);

  return (
    <div className="hidden w-full gap-3 rounded-lg bg-slate-100 p-8 text-primary dark:bg-background md:grid md:grid-cols-[70px_repeat(11,_1fr)]">
      {/* SIDEBAR */}
      <div className="col-span-1 grid auto-rows-min gap-3 text-primary lg:col-span-3">
        <ProfileSidebar schoolName={school!.name} user={user!} />
      </div>
      {children}
    </div>
  );
};

export default ProfileLayout;
