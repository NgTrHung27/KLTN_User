"use client";

import { PostComment } from "@prisma/client";
import { ProfileCommentItem } from "./profile-comment-item";
import { ExtendedComment } from "@/auth";
import { ScrollShadow } from "@nextui-org/react";

interface ProfileCommentsListProps {
  comments: ExtendedComment[];
}

export const ProfileCommentsList = ({ comments }: ProfileCommentsListProps) => {
  if (comments.length === 0) return null;
  return (
    <div className="flex w-full flex-col gap-2">
      <ScrollShadow hideScrollBar className="max-h-[30vh]">
        {comments.map((comment) => (
          <ProfileCommentItem
            name={comment.profile.user.name}
            image={comment.commentImage}
            logo={comment.profile.user.image || undefined}
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            isArchived={comment.isArchived}
          />
        ))}
      </ScrollShadow>
    </div>
  );
};
