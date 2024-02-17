"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

interface ProfileCoverImageProps {
  url?: string;
  preview?: boolean;
}

export const ProfileCoverImage = ({ url, preview }: ProfileCoverImageProps) => {
  return (
    <div
      className={cn(
        "h-[20vh] w-full",
        !url && "bg-zinc-600",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image
          fill
          src={url}
          alt="cover"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

ProfileCoverImage.Skeleton = function ProfileCoverImageSkeleton() {
  return <Skeleton className="h-[20vh] w-full bg-muted" />;
};
