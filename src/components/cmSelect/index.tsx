import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface cmSelectPropsType {
  name: string;
  mainLabel?: string;
  label?: string;
  placeholder?: string;
  options: string[];
  handleSelect?: (v: any) => void;
  className?: string;
  defaultValue?: string;
}

const CMSelect = ({
  name,
  mainLabel,
  label,
  placeholder,
  options,
  handleSelect,
  className,
  defaultValue,
}: cmSelectPropsType) => {
  const { getFieldState, formState, setValue, getValues, clearErrors } = useFormContext();

  const fieldState = getFieldState(name, formState);
  const error = fieldState.error?.message;

  const handleValueChange = (val: any) => {
    setValue(name, val);
    clearErrors(name);
    if (handleSelect) handleSelect(val);
  };

  return (
    <div className={cn(className, "flex-1 space-y-1 relative -top-1")}>
      <div className="flex justify-between gap-2 items-center">
        <label htmlFor={name} className="text-sm">
          {mainLabel}
        </label>
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
      <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
        <SelectTrigger
          className={cn("rounded-lg bg-white/50 ", error && "border border-red-400")}
          name={name}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((option, i) => (
              <SelectItem key={i} value={option} className="px-3">
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CMSelect;
