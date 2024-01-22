import { getVerificationTokenByEmail } from "@/data/verification-token";
import { DegreeType } from "@prisma/client";
import crypto from "crypto";
import { v4 } from "uuid";
import { db } from "./db";

export const generateStudentCode = (degreeType: DegreeType) => {
  const currentYear: number = new Date().getFullYear();
  const year: number = currentYear % 100;
  const yearCode = year.toString();

  const degreeCode = degreeType === DegreeType.HIGHSCHOOL ? "PT" : "DH";

  const token = crypto.randomInt(100_000, 1_000_000).toString();

  return `${yearCode}${degreeCode}${token}`;
};

export const generateVerificationToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
