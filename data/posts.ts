import { db } from "@/lib/db";

export const getPostsByProfileId = async (id: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        profileId: id,
      },
      include: {
        images: true,
        comments: {
          include: {
            likes: true,
            image: true,
            children: true,
          },
        },
        likes: true,
        saves:true,
        
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
