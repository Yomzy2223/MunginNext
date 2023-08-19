import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInTypes } from "./constants";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputWithLabel from "@/components/Inputs/inputWithLabel";

const LoginNew = () => {
  // 1. Define your form.
  const form = useForm<signInTypes>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: signInTypes) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputWithLabel
          form={form}
          name="username"
          label="Username"
          placeholder="Enter your username"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginNew;
