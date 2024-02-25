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
            likes: true,
            commentImage: true,
            children: true,
          },
        },
        likes: true,
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
