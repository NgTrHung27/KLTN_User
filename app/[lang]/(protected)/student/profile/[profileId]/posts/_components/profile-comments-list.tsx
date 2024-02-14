"use client";

import { ExtendedComment } from "@/types";
import { ProfileCommentItem } from "./profile-comment-item";
import { ScrollShadow } from "@nextui-org/react";

interface ProfileCommentsListProps {
  comments: ExtendedComment[];
  name: string;
  image?: string;
}

export const ProfileCommentsList = ({
  comments,
  image,
  name,
}: ProfileCommentsListProps) => {
  if (comments.length === 0) return null;
  return (
    <div className="flex w-full flex-col gap-2">
      <ScrollShadow hideScrollBar className="max-h-[30vh]">
        {comments.map((comment) => (
          <ProfileCommentItem
            name={name}
            image={comment.commentImage || undefined}
            logo={image || undefined}
            key={comment.id}
            content={comment.content || ""}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            isArchived={comment.isArchived}
          />
        ))}
      </ScrollShadow>
    </div>
  );
};
