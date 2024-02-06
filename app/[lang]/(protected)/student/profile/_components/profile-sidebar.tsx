"use client";

import { ExtendedUser } from "@/auth";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { ProfileNavigationList } from "./profile-navigation-list";

interface ProfileSidebarProps {
  user: Pick<ExtendedUser, "image" | "name">;
  schoolName: string;
}

export const ProfileSidebar = ({ user, schoolName }: ProfileSidebarProps) => {
  return (
    <Card className="w-full bg-white dark:bg-background">
      <CardHeader className="justify-center  lg:justify-start">
        <div className="flex items-center justify-center gap-3 p-2">
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
