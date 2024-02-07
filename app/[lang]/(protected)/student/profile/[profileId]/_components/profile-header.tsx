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
  useDisclosure,
} from "@nextui-org/react";
import { ProfileCoverImage } from "./profile-cover-image";
import { useParams, usePathname } from "next/navigation";
import { ProfileHeaderNavigation } from "./profile-header-navigation";
import { Camera, SquarePen } from "lucide-react";
import { ProfileCoverImageModal } from "@/components/modals/profile-cover-image-modal";
import { useEffect, useState } from "react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <>
      <ProfileCoverImageModal
        studentCode={params.profileId as string}
        isOpen={isOpen}
        onClose={onClose}
        imageUrl={coverUrl}
      />
      <Card className="relative">
        <CardHeader className="relative">
          {!mounted ? (
            <ProfileCoverImage.Skeleton />
          ) : (
            <ProfileCoverImage url={coverUrl} />
          )}
          <div className="absolute bottom-6 right-6 flex flex-col gap-3">
            {!coverUrl ? (
              <Button
                startContent={<Camera className="h-4 w-4" />}
                size="sm"
                color="primary"
                variant="shadow"
                onClick={onOpen}
              >
                Add cover
              </Button>
            ) : (
              <Button
                startContent={<Camera className="h-4 w-4" />}
                size="sm"
                color="primary"
                variant="shadow"
                onClick={onOpen}
              >
                Change cover
              </Button>
            )}

            <Button
              startContent={<SquarePen className="h-4 w-4" />}
              size="sm"
              color="primary"
              variant="shadow"
            >
              Edit profile
            </Button>
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
    </>
  );
};
