"use client";

import { PostCommentLib } from "@/types";
import { ProfileCommentItem } from "./profile-comment-item";

interface ProfileCommentsListProps {
  comments?: PostCommentLib[];
  name: string;
  image?: string;
}

export const ProfileCommentsList = ({
  comments,
  image,
  name,
}: ProfileCommentsListProps) => {
  if (comments?.length === 0) return null;
  return (
    <div className="flex w-full flex-col gap-2 overflow-y-scroll scrollbar-hide">
      {comments?.map((comment) => {
        return (
          <>
            <ProfileCommentItem
              postId={comment.postId}
              id={comment.id}
              name={name}
              image={comment.image || undefined}
              logo={image || undefined}
              key={comment.id}
              likes={comment.likes}
              profileId={comment.profileId}
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
