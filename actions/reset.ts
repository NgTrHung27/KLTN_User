"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/auth/reset-password`,
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
      return { error: res.error };
    }

    return { success: "Reset pasword email sent" };
  } catch (error) {
    console.log("RESET PASSWORD ERROR", error);
    return { error: "Failed to reset password" };
  }
};
