import { DegreeType } from "@prisma/client";
import crypto from "crypto";

export const generateStudentCode = (degreeType: DegreeType) => {
  const currentYear: number = new Date().getFullYear();
  const year: number = currentYear % 100;
  const yearCode = year.toString();

  const degreeCode = degreeType === DegreeType.HIGHSCHOOL ? "PT" : "DH";

  const token = crypto.randomInt(100_000, 1_000_000).toString();

  return `${yearCode}${degreeCode}${token}`;
};
