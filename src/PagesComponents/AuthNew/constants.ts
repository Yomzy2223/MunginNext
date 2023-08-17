import * as z from "zod";

//
export const institutionSchema = z
  .object({
    fullname: z
      .string({
        required_error: "Enter your full name",
      })
      .nonempty("Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, {
      message: "Must be at least 6 characters",
    }),
    confirmPassword: z
      .string({
        required_error: "Confirm your password",
      })
      .nonempty("Confirm your password"),
    phone: z
      .string({
        required_error: "Enter phone number",
      })
      .refine((phone) => phone.length === 13, { message: "Enter a valid phone number" }),
    gender: z
      .string({
        required_error: "Select your gender",
      })
      .nonempty("Select your gender"),
    location: z
      .string({
        required_error: "Enter institution location",
      })
      .nonempty("Enter institution location"),
    institutionName: z
      .string({
        required_error: "Enter institution name",
      })
      .nonempty("Enter institution name"),
    areaOfInterest: z
      .string({
        required_error: "Enter area of interest",
      })
      .nonempty("Enter area of interest"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//

//
export const investorSchema = z.object({
  fullname: z
    .string({
      required_error: "Enter your full name",
    })
    .nonempty("Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
  confirmPassword: z
    .string({
      required_error: "Confirm your password",
    })
    .nonempty("Confirm your password"),
  phone: z
    .string({
      required_error: "Enter phone number",
    })
    .refine((phone) => phone.length === 13, { message: "Enter a valid phone number" }),
  gender: z
    .string({
      required_error: "Select your gender",
    })
    .nonempty("Select your gender"),
  companyName: z
    .string({
      required_error: "Enter Company name",
    })
    .nonempty("Enter Company name"),
  companyWebsite: z
    .string({
      required_error: "Enter Company website",
    })
    .nonempty("Enter Conmpany website"),
  areaOfInterest: z
    .string({
      required_error: "Enter area of interest",
    })
    .nonempty("Enter area of interest"),
});

//

//
export const serviceProviderSchema = z.object({
  fullname: z
    .string({
      required_error: "Enter your full name",
    })
    .nonempty("Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
  confirmPassword: z
    .string({
      required_error: "Confirm your password",
    })
    .nonempty("Confirm your password"),
  phone: z
    .string({
      required_error: "Enter phone number",
    })
    .refine((phone) => phone.length === 13, { message: "Enter a valid phone number" }),
  serviceOffering: z
    .string({
      required_error: "Select service offering",
    })
    .nonempty("Enter service offering"),
});

//

//
export const individualSchema = z.object({
  fullname: z
    .string({
      required_error: "Enter your full name",
    })
    .nonempty("Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
  confirmPassword: z
    .string({
      required_error: "Confirm your password",
    })
    .nonempty("Confirm your password"),
  phone: z
    .string({
      required_error: "Enter phone number",
    })
    .refine((phone) => phone.length === 13, { message: "Enter a valid phone number" }),
  gender: z
    .string({
      required_error: "Select your gender",
    })
    .nonempty("Select your gender"),
});

//

//
export const getFarmerSchema = (farms: number, farmType: string[]) => {
  let farmObj = {
    fullname: z
      .string({
        required_error: "Enter your full name",
      })
      .nonempty("Enter your full name"),
    phone: z
      .string({
        required_error: "Enter phone number",
      })
      .refine((phone) => phone.length === 13, { message: "Enter a valid phone number" }),
    phone2: z.string().optional(),
    email: z.string({ required_error: "Enter email address" }).email("Enter a valid email address"),
    password: z.string({ required_error: "Enter your password" }).min(6, {
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
    };
    if (farmType[i] === "animal farming" || farmType[i] === "mixed farming") {
      farmObj = {
        ...farmObj,
        ["animalNames" + i]: z
          .string({ required_error: "Enter animal names" })
          .array()
          .nonempty("Enter animal names"),
      };
    }
    if (farmType[i] === "crop farming" || farmType[i] === "mixed farming") {
      farmObj = {
        ...farmObj,
        ["cropNames" + i]: z
          .string({ required_error: "Enter crop names" })
          .array()
          .nonempty("Enter crop names"),
      };
    }
  }

  return z.object(farmObj).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
};

//

//
export const signInSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type signInTypes = z.infer<typeof signInSchema>;
