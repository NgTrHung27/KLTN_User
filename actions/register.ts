"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByIdCardNumber } from "@/data/user";
import { db } from "@/lib/db";
import { getSchoolByName } from "@/data/school";
import { getProgramByName } from "@/data/program";
import { generateStudentCode, generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    confirmPassword,
    city,
    district,
    ward,
    addressLine,
    schoolName,
    programName,
    gradeScore,
    ...value
  } = validatedFields.data;

  const existingUser =
    (await getUserByEmail(value.email)) ||
    (await getUserByIdCardNumber(value.idCardNumber));

  if (existingUser) {
    return { error: "Email or id card number already in use!" };
  }

  if (value.password && confirmPassword) {
    const passwordMatch = value.password === confirmPassword;

    if (!passwordMatch) {
      return { error: "Password mismatch" };
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword;
  }

  const address = `${addressLine}, ${ward}, ${district}, ${city}`;

  const existingSchool = await getSchoolByName(schoolName);

  if (!existingSchool) {
    return { error: "School not found" };
  }

  const existingProgram = await getProgramByName(
    existingSchool.name,
    programName,
  );

  if (!existingProgram) {
    return { error: "Program not found" };
  }

  const studentCode = generateStudentCode(value.degreeType);

  const user = await db.user.create({
    data: {
      studentCode: studentCode,
      address,
      gradeScore: parseFloat(gradeScore),
      schoolId: existingSchool.id,
      studentProgram: {
        create: {
          programId: existingProgram.id,
        },
      },
      ...value,
    },
  });

  const verificationToken = await generateVerificationToken(value.email);

  await sendVerificationEmail(
    user.name,
    process.env.NODE_SENDER_EMAIL!,
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };
};
