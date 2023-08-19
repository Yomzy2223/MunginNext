"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { cmFieldPropType } from "./constants";

const PhoneNumInput = ({
  form,
  name,
  label,
  placeholder,
  textSize,
  bottom,
  className,
}: cmFieldPropType) => {
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(name, formState);
  const invalid = fieldState.invalid;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col flex-1 justify-center", className)}>
          <div className="flex justify-between gap-4 w-full">
            <div className={`flex justify-start items-center gap-2 text-sm `}>
              <FormLabel className={`text-sm leading-3 font-normal text-label ${textSize} `}>
                {label}
              </FormLabel>
            </div>
            <FormMessage className={`min-w-max text-sm leading-3 font-normal ${textSize}`} />
          </div>
          <FormControl>
            <PhoneInput
              country={"ng"}
              preferredCountries={["ng"]}
              placeholder="8137726622"
              {...field}
              inputProps={
                {
                  // name: "phone",
                  // required: true,
                  // autoFocus: true,
                }
              }
              buttonStyle={{ border: invalid ? "1px solid red" : "" }}
              inputStyle={{ border: invalid ? "1px solid red" : "", width: "100%" }}
            />
          </FormControl>
          {bottom}
        </FormItem>
      )}
    />
  );
};

export default PhoneNumInput;
