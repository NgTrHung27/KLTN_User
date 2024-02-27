"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/auth/register`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    const result = await res.json();

    if (result.error) {
      return { error: result.error };
    }

    return {
      success:
        "Register successfully, please check your email for verification",
    };
  } catch (error) {
    console.log("REGISTER ERROR", error);
    return { error: "Register failed" };
  }
};
