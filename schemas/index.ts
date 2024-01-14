import * as z from "zod";

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
    gender: z
      .string({
        required_error: "Gender is required",
      })
      .refine((data) => data === "Male" || data === "Female", {
        message: "Invalid gender",
      }),
    phoneNumber: z
      .string({
        invalid_type_error: "Invalid phone number",
        required_error: "Phone number is required",
      })
      .min(10, {
        message: "Minimum 10 numbers is required",
      })
      .max(11, {
        message: "Maximum 11 numbers is required",
      }),
    idCardNumber: z.string({
      required_error: "Id card number is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  });
