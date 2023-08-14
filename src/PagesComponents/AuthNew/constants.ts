import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// export const signUpSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });
// export type signUpTypes = z.infer<typeof signUpSchema>;

export const getSignUpSchema = (farms: number) => {
  let farmObj = {
    fullname: z
      .string({
        required_error: "Enter your full name",
      })
      .nonempty("Enter your full name"),
    phone1: z
      .string({
        required_error: "Enter phone number 1",
      })
      .refine((phone) => phone.length === 11, { message: "Enter a valid phone number" }),
    phone2: z
      .string({
        required_error: "Enter phone number 2",
      })
      .refine((phone) => phone.length === 11, { message: "Enter a valid phone number" }),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, {
      message: "Must be at least 6 characters",
    }),
    confirmPassword: z
      .string({
        required_error: "Confirm your password",
      })
      .nonempty("Confirm your password"),
    gender: z
      .string({
        required_error: "Select your gender",
      })
      .nonempty("Select your gender"),
    farmsNumber: z
      .string({
        required_error: "Enter farm number",
      })
      .refine((data) => parseInt(data) >= 1, { message: "Must be minimum of 1" }),
  };

  for (let i = 0; i < farms; i++) {
    farmObj = {
      ...farmObj,
      ["farmName" + i]: z.string({ required_error: "Enter farm name" }).nonempty("Enter farm name"),
      ["location" + i]: z
        .string({ required_error: "Enter farm location" })
        .nonempty("Enter farm location"),
      ["farmType" + i]: z
        .string({ required_error: "Select farm type" })
        .nonempty("Select farm type"),
      ["farmSize" + i]: z.string({ required_error: "Enter farm size" }).nonempty("Enter farm size"),
      ["animalNames" + i]: z
        .string({ required_error: "Enter animal names" })
        .array()
        .nonempty("Enter animal names"),
      ["cropNames" + i]: z
        .string({ required_error: "Enter crop names" })
        .array()
        .nonempty("Enter crop names"),
    };
  }

  return z.object(farmObj).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
};

export const signInSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type signInTypes = z.infer<typeof signInSchema>;
