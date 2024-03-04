"use client";

import { GetCommentsByParentId } from "@/actions/comment";
import { LikeCmt } from "@/actions/likecmt";
import { cn } from "@/lib/utils";
import { BasicComment } from "@/types";
import { Avatar, Image, Spinner } from "@nextui-org/react";
import { PostCommentImage, PostCommentLike } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { CornerDownRight, CornerLeftUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ProfileCommentForm } from "./profile-comment-form";
import { ProfileCommentsList } from "./profile-comments-list";

interface ProfileCommentItemProps {
  postId: string;
  id: string;
  content?: string;
  likes?: PostCommentLike[];
  image?: PostCommentImage;
  profileId: String;
  name: string;
  logo?: string;
  createdAt: Date;
  updatedAt?: Date;
  isArchived: boolean;
  childLength?: number;
}
export const ProfileCommentItem = ({
  content,
  image,
  name,
  logo,
  likes,
  createdAt,
  updatedAt,
  isArchived,
  postId,
  id,
  profileId,
  childLength,
}: ProfileCommentItemProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<CommentLib[]>([]);

  const onLoad = async () => {
    startTransition(() => {
      GetCommentsByParentId(postId, id).then((res) => {
        if (res) {
          setItems(res);
        }
      });
    });

    setIsExpanded(true);
  };
  const router = useRouter();
  const params = useParams();
  const studentCode = params.studentCode as string;
  const onLike = async () => {
    startTransition(() => {
      LikeCmt(studentCode, id);
    });

    router.refresh();
  };
  const isLike = likes?.some((LikeCmt) => LikeCmt.profileId == profileId);

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex gap-2">
        <Avatar src={logo} alt="logo" />
        <div className="flex flex-col">
          <div className="w-fit rounded-2xl bg-default-100 px-3 py-1 hover:bg-default-200">
            <span className="text-sm font-bold text-default-600 dark:text-default-400">
              {name}
            </span>
            <p className="text-sm text-primary">{content}</p>
          </div>
          {image && (
            <div className="aspect-auto w-full max-w-[200px]">
              <Image src={image?.url} alt="comment image" />
            </div>
          )}
        </div>
      </div>
      <div className="ml-[48px] flex  items-center gap-3 text-sm text-primary">
        <span className="text-zinc-600 dark:text-zinc-400">
          {formatDistanceToNowStrict(createdAt, {
            locale: vi,
          })}
        </span>
        <span
          onClick={() => onLike()}
          className={cn(
            "cursor-pointer hover:underline",
            isLike && "font-bold text-rose-500",
          )}
        >
          Like
        </span>
        <span
          onClick={() => setIsCommenting((value) => !value)}
          className={cn(
            "cursor-pointer hover:underline",
            isCommenting && "font-bold",
          )}
        >
          Reply
        </span>
      </div>
      {childLength! > 0 && !isExpanded && (
        <div className="ml-[48px] flex items-center gap-2">
          <CornerDownRight className="size-4" />
          <span
            onClick={onLoad}
            className="cursor-pointer text-base text-zinc-600 hover:underline dark:text-zinc-400"
          >
            See {childLength} response(s)
          </span>
          {isPending && <Spinner size="sm" />}
        </div>
      )}
      {isExpanded && (
        <div className="ml-[48px] flex  flex-col gap-2">
          <ProfileCommentsList comments={items} name={name} image={logo} />
          <div className="flex  items-center gap-2">
            <CornerLeftUp className="size-4" />
            <span
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer text-base text-zinc-600 hover:underline dark:text-zinc-400"
            >
              Hide all responses
            </span>
            {isPending && <Spinner size="sm" />}
          </div>
        </div>
      )}
      {isCommenting && (
        <div className="ml-[48px]">
          <ProfileCommentForm
            logo={logo || ""}
            postId={postId}
            parentId={id}
            onLoad={onLoad}
          />
        </div>
      )}
    </div>
  );
};
