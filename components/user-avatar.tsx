"use client";

import { User } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";

interface UserAvatar {
  name: string;
  description?: string;
  image?: string;
}

export const UserAvatar = ({ name, description, image }: UserAvatar) => {
  return (
    <User
      name={name}
      description={description}
      avatarProps={{
        isBordered: true,
        fallback: (
          <CameraIcon className="size-6 animate-pulse text-default-500" />
        ),
        src: image || undefined,
      }}
      classNames={{
        name: "text-primary font-semibold",
      }}
    />
  );
};
