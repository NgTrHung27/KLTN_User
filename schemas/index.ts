import * as z from "zod";
import {
  CertificateType,
  DegreeType,
  Gender,
  GradeType,
  PostStatus,
} from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid type of email",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Invalid type of email",
    }),
    password: z
      .string()
      // Minimum length of 8 characters
      .min(8, { message: "Password must be at least 8 characters long" })
      // Maximum length of 25 characters
      .max(25, { message: "Password cannot exceed 25 characters" })
      // Check for at least one digit
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      // Check for at least one lowercase letter
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      // Check for at least one uppercase letter
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      // Check for at least one special character
      .refine((value) => /[^\w\s]/.test(value), {
        message: "Password must contain at least one special character",
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
      .max(new Date("2006-31-12"), {
        message: "Your age is too young",
      }),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      invalid_type_error: "Invalid type, please reselect",
    }),
    phoneNumber: z
      .string({
        invalid_type_error: "Invalid phone number",
      })
      .min(10, {
        message: "Minimum 10 numbers is required",
      })
      .max(13, {
        message: "Maximum 13 numbers is required",
      }),
    idCardNumber: z
      .string()
      .min(9, {
        message: "Minimum 9 numbers is required",
      })
      .max(12, {
        message: "Maximum 12 numbers is required",
      })
      .refine((value) => /^\d+$/.test(value), {
        message: "Please enter a valid id card number",
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
    schoolName: z
      .string({
        required_error: "School is required",
      })
      .min(1, {
        message: "School is required",
      }),
    programName: z
      .string({
        required_error: "Program is required",
      })
      .min(1, {
        message: "Program is required",
      }),
    degreeType: z.enum([DegreeType.HIGHSCHOOL, DegreeType.UNIVERSITY], {
      required_error: "Degree type is required",
      invalid_type_error: "Invalid type, please reselect",
    }),
    certificateType: z.enum([CertificateType.IELTS, CertificateType.TOEFL], {
      required_error: "Certificate type is required",
      invalid_type_error: "Invalid type, please reselect",
    }),
    certificateImg: z
      .string({
        required_error: "Certificate image is required",
      })
      .min(1, {
        message: "Certificate image is required",
      }),
    gradeType: z.enum([GradeType.GPA, GradeType.CGPA], {
      required_error: "Grade type is required",
      invalid_type_error: "Invalid type, please reselect",
    }),
    gradeScore: z
      .string({
        required_error: "Grade score is required",
      })
      .min(1, {
        message: "Grade score is required",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  })
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

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid type of email",
    }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      // Minimum length of 8 characters
      .min(8, { message: "Password must be at least 8 characters long" })
      // Maximum length of 25 characters
      .max(25, { message: "Password cannot exceed 25 characters" })
      // Check for at least one digit
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      // Check for at least one lowercase letter
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      // Check for at least one uppercase letter
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      // Check for at least one special character
      .refine((value) => /[^\w\s]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  });

export const AccountFormSchema = z
  .object({
    email: z.optional(
      z
        .string({
          invalid_type_error: "Invalid email",
        })
        .email(),
    ),
    password: z.optional(z.string()),
    confirmPassword: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password !== undefined && data.confirmPassword === undefined) {
        return false;
      }

      if (data.password === undefined && data.confirmPassword !== undefined) {
        return false;
      }

      if (
        data.password !== undefined &&
        data.confirmPassword !== undefined &&
        data.password !== data.confirmPassword
      ) {
        return false;
      }

      return true;
    },
    {
      message: "Passwords mismatch",
      path: ["confirmPassword"],
    },
  );

export const PostSchema = z.object({
  status: z.optional(
    z.enum([
      PostStatus.PUBLIC,
      PostStatus.PRIVATE,
      PostStatus.FRIENDS,
      PostStatus.EXCEPT,
    ]),
  ),
  content: z.optional(z.string()),
  postImages: z.optional(z.array(z.string())),
});

export const CommentSchema = z.object({
  content: z.optional(z.string()),
  image: z.optional(z.string()),
});
