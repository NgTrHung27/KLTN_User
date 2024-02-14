"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ProfileHeader } from "./_components/profile-header";
import { ProfileInformation } from "./_components/profile-information";
import { Button } from "@nextui-org/react";
import { ChevronsLeft } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProfileIdLayout = ({
  children,
  params: { profileId },
}: {
  children: React.ReactNode;
  params: { profileId: string };
}) => {
  const user = useCurrentUser();
  const school = user?.school;
  const profile = user?.profile;
  const postCount = profile?.posts.length;

  if (!user?.studentCode.match(profileId)) {
    return (
      <div className="col-span-11 h-full w-full bg-white text-primary dark:bg-background lg:col-span-9">
        Another user
      </div>
    );
  }

  return (
    <>
      <div className="col-span-11 grid gap-3 lg:col-span-9 lg:grid-cols-7">
        <div className="items-ceneter flex flex-col justify-start gap-3 lg:col-span-5">
          <ProfileHeader
            postCount={postCount}
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
      <Sheet>
        <SheetTrigger asChild className="sm:hidden md:block lg:hidden">
          <div className="fixed right-0 top-[50%] w-8 rounded-l-full bg-muted-foreground opacity-30 transition-all hover:w-16 hover:cursor-pointer hover:opacity-100">
            <ChevronsLeft className="h-8 w-8 " />
          </div>
        </SheetTrigger>
        <SheetContent className="right-8 top-[calc(85px+32px)] h-[calc(100%-85px-85px-32px-32px)] overflow-y-scroll rounded-xl">
          <ProfileInformation
            address={user.address}
            dob={user.dob}
            schoolLogo={school?.logoUrl!}
            schoolName={school?.name!}
          />
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button color="danger" variant="bordered" className="flex-1">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileIdLayout;
