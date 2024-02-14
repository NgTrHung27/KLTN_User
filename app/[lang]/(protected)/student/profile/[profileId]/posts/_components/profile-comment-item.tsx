"use client";

import { Avatar, Input } from "@nextui-org/react";
import { PostCommentImage } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale/vi";

interface ProfileCommentItemProps {
  content?: string;
  image?: PostCommentImage;
  name: string;
  logo?: string;
  createdAt: Date;
  updatedAt?: Date;
  isArchived: boolean;
}

export const ProfileCommentItem = ({
  content,
  image,
  name,
  logo,
  createdAt,
  updatedAt,
  isArchived,
}: ProfileCommentItemProps) => {
  return (
    <div className="flex w-full items-center gap-2">
      <Avatar src={logo || "/placeholder.webp"} alt="logo" />
      <Input
        readOnly
        radius="lg"
        label={name}
        value={content}
        classNames={{
          label: "font-bold text-base text-primary",
          inputWrapper: "w-fit",
        }}
        description={
          <div className="flex items-center gap-3 text-sm text-primary">
            <span className="text-zinc-600 dark:text-zinc-400">
              {formatDistanceToNowStrict(createdAt, {
                locale: vi,
              })}
            </span>
            <span>Like</span>
            <span>Reply</span>
          </div>
        }
      />
    </div>
  );
};
