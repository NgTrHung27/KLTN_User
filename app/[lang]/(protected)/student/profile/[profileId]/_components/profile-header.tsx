"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ProfileCoverImage } from "./profile-cover-image";
import { useParams, usePathname } from "next/navigation";
import { ProfileHeaderNavigation } from "./profile-header-navigation";
import { Camera, SquarePen } from "lucide-react";

interface ProfileHeaderProps {
  coverUrl?: string;
  name: string;
  logoUrl?: string;
  schoolName: string;
}

export const ProfileHeader = ({
  coverUrl,
  name,
  logoUrl,
  schoolName,
}: ProfileHeaderProps) => {
  const params = useParams();
  const pathname = usePathname();

  console.log(pathname.slice(3));

  return (
    <Card className="relative">
      <CardHeader className="relative">
        <ProfileCoverImage url={coverUrl} />
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <Button
            startContent={<Camera className="h-4 w-4" />}
            size="sm"
            color="primary"
            variant="shadow"
          >
            Add cover
          </Button>
          {!coverUrl && (
            <Button
              startContent={<SquarePen className="h-4 w-4" />}
              size="sm"
              color="primary"
              variant="shadow"
            >
              Edit profile
            </Button>
          )}
        </div>
      </CardHeader>
      <div className="absolute left-8 top-[calc(12px+25vh-48px)] z-10 flex items-start justify-between gap-2">
        <Avatar src={logoUrl} className=" h-24 w-24" />
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-lg font-bold text-background">{name}</h1>
          <h2 className="text-xs font-semibold text-muted-foreground">
            {schoolName}
          </h2>
        </div>
      </div>
      <CardBody className="flex h-fit items-center justify-center">
        <ProfileHeaderNavigation
          pathname={pathname}
          profileId={params.profileId as string}
        />
      </CardBody>
    </Card>
  );
};
