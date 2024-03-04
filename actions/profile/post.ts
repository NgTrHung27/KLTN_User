"use server";

import { currentUser } from "@/lib/user";
import { PostSchema } from "@/schemas";
import { z } from "zod";

export const CreatePost = async (values: z.infer<typeof PostSchema>) => {
  try {
    console.log("TEST");

    const user = await currentUser();

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/profiles/${user?.studentCode}/posts`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    const res = await req.json();

    if (res.error) {
      console.log(res.error);
      return { error: res.error };
    }

    return { success: "Create new post successfully" };
  } catch (error) {
    console.log("ERROR CREATE NEW POST", error);

    return { error: "Error creating new post" };
  }
};
