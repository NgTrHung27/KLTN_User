import { db } from "@/lib/db";

export const GetTotalCommentsByPostId = async (postId: string) => {
  try {
    const comments = await db.postComment.findMany({
      where: {
        postId,
      },
    });

    return comments.length;
  } catch {
    return 0;
  }
};
