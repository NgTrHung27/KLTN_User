"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email,
  );

  await sendPasswordResetEmail(
    existingUser.name,
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
};
