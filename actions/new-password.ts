"use server";

import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/auth/new-password/${token}`,
      {
        method: "POST",
        cache: "no-cache",
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

    return { success: "Change password successfully" };
  } catch (error) {
    console.log("CHANGE PASSWORD ERROR", error);
    return { error: "Failed to create new password" };
  }
};
