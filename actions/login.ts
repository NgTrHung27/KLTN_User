"use server";

import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User not found!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      existingUser.name,
      process.env.NODE_SENDER_EMAIL!,
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `${DEFAULT_LOGIN_REDIRECT}/settings`,
    });

    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid creadentials!" };
        case "AuthorizedCallbackError":
          return { error: "Email not yet verified!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
