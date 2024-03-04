"use server";

import { getUserByEmail, getUserByIdCardNumber } from "@/data/user";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { PostSchema } from "@/schemas";
import { PostStatus } from "@prisma/client";
import { z } from "zod";

export const CreateNewProfilePost = async (
  values: z.infer<typeof PostSchema>,
) => {
  try {
    const validatedFields = PostSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid post values" };
    }

    const user = await currentUser();

    if (!user) {
      return { error: "User not found" };
    }

    const existingUser = await getUserByIdCardNumber(user.idCardNumber!);

    if (!existingUser) {
      return { error: "User not found" };
    }

    if (!existingUser.profile) {
      return { error: "Profile not found" };
    }

    const { images, ...value } = validatedFields.data;

    if (!value.status) {
      value.status = PostStatus.PUBLIC;
    }

    const post = await db.post.create({
      data: {
        profileId: existingUser.profile.id,
        ...value,
      },
      select: {
        id: true,
        images: true,
      },
    });

    if (!images) {
      return { success: "Create new post successfully" };
    } else {
      for (const image of images) {
        await db.postImage.create({
          data: {
            postId: post.id,
            url: image,
          },
        });
      }

      return { success: "Create new post successfully" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Error occurred while creating new post" };
  }
};
