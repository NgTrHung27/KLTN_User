import * as z from "zod";
import { CertificateType, DegreeType, GradeType } from "@prisma/client";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Invalid type of email",
      }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
    name: z.string().min(1, {
      message: "Fullname is required",
    }),
    dob: z
      .date({
        required_error: "Date of birth is required",
      })
      .min(new Date("1970-01-01"), {
        message: "Your age is too old",
      })
      .max(new Date("2006-01-01"), {
        message: "Your age is too young",
      }),
    gender: z.enum(["Male", "Female"]),
    phoneNumber: z
      .string({
        invalid_type_error: "Invalid phone number",
        required_error: "Phone number is required",
      })
      .min(10, {
        message: "Minimum 10 numbers is required",
      })
      .max(13, {
        message: "Maximum 13 numbers is required",
      }),
    idCardNumber: z
      .string({
        required_error: "Id card number is required",
      })
      .min(1, {
        message: "Id card number is required",
      }),
    city: z.string().min(1, {
      message: "City is required",
    }),
    district: z.string().min(1, {
      message: "District is required",
    }),
    ward: z.string().min(1, {
      message: "Ward is required",
    }),
    addressLine: z.string().min(1, {
      message: "Address line is required",
    }),
    schoolName: z.optional(z.string()),
    programName: z.optional(z.string()),
    degreeType: z.optional(
      z.enum([DegreeType.HIGHSCHOOL, DegreeType.UNIVERSITY]),
    ),
    languageType: z.optional(
      z.enum([CertificateType.IELTS, CertificateType.TOEFL]),
    ),
    languageImg: z.optional(z.string()),
    gradeType: z.optional(z.enum([GradeType.GPA, GradeType.CGPA])),
    gradeScore: z.optional(z.string()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.schoolName && !data.programName) {
        return false;
      }

      return true;
    },
    {
      message: "Program is required",
      path: ["programName"],
    },
  )
  .refine(
    (data) => {
      if (data.gradeType === GradeType.GPA) {
        if (data.gradeScore && parseInt(data.gradeScore) > 4) {
          return false;
        }

        if (data.gradeScore && parseInt(data.gradeScore) < 0) {
          return false;
        }

        return true;
      }

      if (data.gradeType === GradeType.CGPA) {
        if (data.gradeScore && parseInt(data.gradeScore) > 10) {
          return false;
        }

        if (data.gradeScore && parseInt(data.gradeScore) < 0) {
          return false;
        }

        return true;
      }
    },
    {
      message: "Invalid grade score (maximum is 4 or 10)",
      path: ["gradeScore"],
    },
  );
