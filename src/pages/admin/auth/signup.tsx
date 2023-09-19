import InputWithLabel from "@/components/Inputs/inputWithLabel";
import AuthLayout from "@/layout/AuthLayout";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import profilesvg from "@/assets/icons/profile.svg";
import { signUpSchema, signUpTypes } from "@/lib/constants";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<signUpTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: signUpTypes) => {
    setLoading(true);

    setLoading(false);
  };

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3 m-auto ">
          <div className="flex flex-col items-center gap-4 justify-center">
            <p className="text-3xl font-semibold mb-2">Sign Up</p>
            <Image src={profilesvg} alt="" />
            <p className="text-2xl font-semibold">Admin</p>
          </div>
          <InputWithLabel
            form={form}
            name="fullname"
            label="Fullname"
            placeholder="Enter your fullname"
          />

          <InputWithLabel
            form={form}
            name="fullname"
            label="Fullname"
            placeholder="Enter your fullname"
          />

          <div className="flex gap-4">
            <InputWithLabel
              form={form}
              name="password"
              label="Password"
              placeholder="Must be at least 6 characters"
              type="password"
            />
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Signup;
