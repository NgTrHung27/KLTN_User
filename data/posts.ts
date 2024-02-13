import { db } from "@/lib/db";

export const getProfilePostsByNewest = async (profileId: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        profileId,
        isArchived: false,
      },
      include: {
        postImages: true,
        comments: true,
        likes: true,
        saves: true,
        shares: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch {
    return null;
  }
};

export const getProfilePostsByRelevant = async (profileId: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        profileId,
        isArchived: false,
      },
      include: {
        postImages: true,
        comments: {
          include: {
            parentComment: true,
            children: true,
          },
          select: {
            children: true,
            parentComment: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: true,
        saves: true,
        shares: true,
      },
    });

    posts.sort((a, b) => {
      a.comments.sort((c, d) => {
        return c.updatedAt.getTime() - d.updatedAt.getTime();
      });
      const commentA = a.comments[0];

      b.comments.sort((c, d) => {
        return c.updatedAt.getTime() - d.updatedAt.getTime();
      });
      const commentB = b.comments[0];

      return commentA.updatedAt.getTime() - commentB.updatedAt.getTime();
    });

    return posts;
  } catch {
    return null;
  }
};
