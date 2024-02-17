"use client";

import { BasicComment } from "@/types";
import { ProfileCommentItem } from "./profile-comment-item";

interface ProfileCommentsListProps {
  comments: BasicComment[];
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
    <div className="flex w-full flex-col gap-2 overflow-y-scroll scrollbar-hide">
      {comments.map((comment) => {
        return (
          <>
            <ProfileCommentItem
              postId={comment.postId}
              id={comment.id}
              name={name}
              image={comment.commentImage || undefined}
              logo={image || undefined}
              key={comment.id}
              content={comment.content || ""}
              createdAt={comment.createdAt}
              updatedAt={comment.updatedAt}
              isArchived={comment.isArchived}
              childLength={comment.children.length}
            />
          </>
        );
      })}
    </div>
  );
};
