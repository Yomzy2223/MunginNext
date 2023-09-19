//
import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
  confirmPassword: z
    .string({
      required_error: "Confirm your password",
    })
    .nonempty("Confirm your password"),
});

export type signUpTypes = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
});

export type signInTypes = z.infer<typeof signInSchema>;
