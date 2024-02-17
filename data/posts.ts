import { db } from "@/lib/db";

export const getPostsByProfileId = async (id: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        profileId: id,
      },
      include: {
        postImages: true,
        comments: {
          include: {
            commentImage: true,
            children: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    return null;
  }
};
