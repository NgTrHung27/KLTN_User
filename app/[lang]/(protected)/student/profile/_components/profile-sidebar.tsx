"use client";

import { ExtendedUser } from "@/auth";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { ProfileNavigationList } from "./profile-navigation-list";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  user: Pick<ExtendedUser, "image" | "name" | "studentCode">;
  schoolName: string;
}

export const ProfileSidebar = ({ user, schoolName }: ProfileSidebarProps) => {
  const pathname = usePathname();

  return (
    <Card className="w-full bg-white dark:bg-background">
      <CardHeader className="">
        <Link
          isBlock
          href={`/student/profile/${user.studentCode}`}
          className={cn(
            "w-full p-0",
            pathname.includes(`/student/profile/${user.studentCode}`) &&
              "rounded-xl border-3 border-[#7d1f1f56] dark:border-primary",
          )}
        >
          <div className="flex w-full items-center justify-center  gap-3 p-2 lg:justify-start">
            <Avatar
              isBordered
              radius="full"
              color="primary"
              alt="avatar"
              src={user.image || "/placeholder.webp"}
            />
            <div className="hidden items-start justify-center gap-1 font-semibold lg:flex lg:flex-col">
              <h4 className="text-sm font-bold leading-none">{user.name}</h4>
              <h5 className="flex items-center gap-1 text-xs tracking-tight text-muted-foreground">
                {schoolName}
              </h5>
            </div>
          </div>
        </Link>
      </CardHeader>
      <div className="px-6">
        <Divider />
      </div>
      <CardBody>
        <ProfileNavigationList />
      </CardBody>
    </Card>
  );
};
