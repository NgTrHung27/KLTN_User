"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    console.log("Meomeo");
    await signIn("credentials", {
      email,
      password,
    }).then(() => {
      return { success: "Login successful" };
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid creadentials!" };
        case "AuthorizedCallbackError":
          return { success: "Confirmation email sent!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
