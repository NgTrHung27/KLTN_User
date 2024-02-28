"use client";

import { ProfileCoverImageModal } from "@/components/modals/profile-cover-image-modal";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import { Camera, SquarePen } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileCoverImage } from "./profile-cover-image";
import { ProfileHeaderNavigation } from "./profile-header-navigation";

interface ProfileHeaderProps {
  coverUrl?: string;
  name: string;
  logoUrl?: string;
  schoolName: string;
  postCount?: number;
}

export const ProfileHeader = ({
  coverUrl,
  name,
  logoUrl,
  schoolName,
  postCount,
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
        studentCode={params.studentCode as string}
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
          <div className="absolute bottom-3 right-6 flex flex-col gap-3">
            {!coverUrl ? (
              <Button
                startContent={<Camera className="size-4" />}
                size="sm"
                color="primary"
                variant="shadow"
                onClick={onOpen}
              >
                Add cover
              </Button>
            ) : (
              <Button
                startContent={<Camera className="size-4" />}
                size="sm"
                color="primary"
                variant="shadow"
                onClick={onOpen}
              >
                Change cover
              </Button>
            )}
          </div>
        </CardHeader>
        <div className="absolute left-16 top-[calc(12px+20vh-12px)] z-10 flex items-center justify-between gap-3">
          <Avatar src={logoUrl} className=" h-28 w-28" />
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-lg font-bold text-primary">{name}</h1>
            <h2 className="text-xs font-semibold text-primary">{schoolName}</h2>
          </div>
        </div>
        <CardBody className="flex h-[calc(90px+12px)] flex-row items-center justify-end">
          <Button
            startContent={<SquarePen className="size-4" />}
            size="md"
            color="primary"
            variant="shadow"
          >
            Edit profile
          </Button>
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <ProfileHeaderNavigation
            postCount={postCount}
            pathname={pathname}
            studentCode={params.studentCode as string}
          />
        </CardFooter>
      </Card>
    </>
  );
};
