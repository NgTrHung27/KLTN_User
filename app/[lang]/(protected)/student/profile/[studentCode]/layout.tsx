import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getPostsByProfileId } from "@/data/posts";
import { getProfileByStudentCode } from "@/data/profile";
import { getSchoolByUserId } from "@/data/school";
import { currentUser } from "@/lib/user";
import { Button } from "@nextui-org/react";
import { ChevronsLeft } from "lucide-react";
import { ProfileHeader } from "./_components/profile-header";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const ProfileIdLayout = async ({
  children,
  params: { studentCode },
}: {
  children: React.ReactNode;
  params: { studentCode: string };
}) => {
  const user = await currentUser();

  if (studentCode === "undefined") {
    redirect(`${DEFAULT_LOGIN_REDIRECT}/${user?.studentCode}`);
  }

  const school = await getSchoolByUserId(user?.id!);
  const profile = await getProfileByStudentCode(user?.studentCode!);
  const posts = await getPostsByProfileId(profile?.id!);

  if (!user?.studentCode.match(studentCode)) {
    return (
      <div className="hidden px-24 py-6 md:block">
        <ProfileHeader
          name={user?.name!}
          schoolName={school?.name!}
          coverUrl={profile?.coverImage || ""}
          logoUrl={user?.image || ""}
          postCount={posts?.length}
        />
      </div>
    );
  }

  return (
    <div className="hidden flex-col gap-3 px-24 py-6 md:flex">
      <ProfileHeader
        name={user?.name!}
        schoolName={school?.name!}
        coverUrl={profile?.coverImage || ""}
        logoUrl={user?.image || ""}
        postCount={posts?.length}
      />
      {children}
    </div>
  );
};

export default ProfileIdLayout;
