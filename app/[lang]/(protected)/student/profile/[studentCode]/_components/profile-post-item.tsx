"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { PostComment, PostImage, PostStatus } from "@prisma/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  Bookmark,
  Globe2,
  Heart,
  Lock,
  MessageCircleMore,
  MoreHorizontal,
  Share2,
  UserX,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileCommentsList } from "./profile-comments-list";
import { ExtendedComment } from "@/types";
import { ProfileCommentForm } from "./profile-comment-form";

interface ProfilePostItemProps {
  name: string;
  logo: string;
  comments?: ExtendedComment[];
  id: string;
  createdAt: Date;
  isModified: boolean;
  status: PostStatus;
  content?: string;
  images?: PostImage[];
}

const statusType = {
  PUBLIC: <Globe2 className="h-4 w-4" />,
  PRIVATE: <Lock className="h-4 w-4" />,
  FRIENDS: <Users className="h-4 w-4" />,
  EXCEPT: <UserX className="h-4 w-4" />,
};

export const ProfilePostItem = ({
  logo,
  name,
  createdAt,
  isModified,
  status,
  content,
  id,
  comments,
  images,
}: ProfilePostItemProps) => {
  const parentComments = comments?.filter(
    (comment) => !comment.parentCommentId,
  );
  return (
    <Card>
      <CardHeader className="items-center justify-between pr-6">
        <div className="flex items-start gap-2">
          <Avatar src={logo || "/placeholder.webp"} alt="logo" />
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold text-primary">{name}</p>
            <div className="flex items-center gap-[1px]">
              <p className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                <span>{format(createdAt, "dd MMMM", { locale: vi })}</span>
                <span>at</span>
                <span>{format(createdAt, "p", { locale: vi })}</span>
              </p>
              <Chip
                size="sm"
                variant="dot"
                className="p-0"
                classNames={{ dot: "w-1 h-1", base: "border-0" }}
              >
                {statusType[status]}
              </Chip>
            </div>
          </div>
        </div>
        <MoreHorizontal className="h-6 w-6 text-zinc-600 dark:text-zinc-400 " />
      </CardHeader>
      <CardBody className="pt-0">
        <p className="font-semibold text-primary">{content}</p>
        {images && (
          <div className="grid grid-cols-2 gap-2">
            {images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt="post image"
                className="aspect-square"
                classNames={{
                  wrapper: images.length === 1 && "col-span-2 aspect-video",
                }}
              />
            ))}
          </div>
        )}
      </CardBody>
      <div className="px-4">
        <Divider />
        <div className="grid grid-cols-4 gap-1 ">
          <Button
            startContent={<MessageCircleMore />}
            variant="light"
            color="primary"
          >
            {comments?.length} Comments
          </Button>
          <Button startContent={<Heart />} variant="light" color="primary">
            0 Likes
          </Button>
          <Button startContent={<Share2 />} variant="light" color="primary">
            0 Share
          </Button>
          <Button startContent={<Bookmark />} variant="light" color="primary">
            0 Saved
          </Button>
        </div>
        <Divider />
      </div>
      <CardFooter className="flex-col items-start justify-start gap-2">
        <ProfileCommentsList
          comments={parentComments || []}
          name={name}
          image={logo}
        />
        <ProfileCommentForm logo={logo} postId={id} />
      </CardFooter>
    </Card>
  );
};
