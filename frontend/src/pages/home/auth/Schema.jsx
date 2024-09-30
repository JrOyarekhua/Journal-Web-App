import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
  firstName: z.string().min(2, {
    message: " first name must be at least 2 characters long",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters long",
  }),
  // username: z
  //   .string()
  //   .min(2, {
  //     message: "username must be at least 2 characters long",
  //   })
  //   .max(20, {
  //     message: "username must be at most 20 characters long",
  //   })
  //   .regex(
  //     /^[a-zA-z][a-zA-z0-9_-]*/,
  //     "username must start with a letter and must only contain letters, numbers, underscores, and hyphens"
  //   ),
  password: z
    .string()
    .min(2, { message: "password must be at least 2 characters long" })
    .max(64, { message: "password must be at most 64 characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "password must contain at least 1 uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "password must contain at least 1 lowercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "password must contain at least 1 number",
    }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({
      message: "please enter a valid email address",
    }),
  password: z.string().min(1, { message: "password is required" }),
});
