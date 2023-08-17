import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { cmFieldPropType } from "./constants";

const InputWithLabel = ({
  form,
  name,
  label,
  type,
  placeholder,
  id,
  textSize,
  bottom,
  className,
  onChange,
  onKeyDown,
}: cmFieldPropType) => {
  const [typeM, setTypeM] = useState(type);
  const [inpValue, setInpValue] = useState("");
  const [valueTag, setValueTag] = useState<string[]>([]);

  const { getFieldState, formState, setValue } = useFormContext();
  const fieldState = getFieldState(name, formState);

  const toggleType = () => setTypeM(typeM === "password" ? "text" : "password");

  const Password = (
    <p className="absolute right-2 cursor-pointer text-sm " onClick={toggleType}>
      {typeM === "password" ? "Show" : "Hide"}
    </p>
  );

  const handleChange = (e: any) => {
    const val = e.target.value;
    setInpValue(val);
    if (type !== "array") setValue(name, val, { shouldValidate: true });
    if (onChange) onChange(e);
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      if (type === "array") {
        const newArr = [...valueTag, inpValue];
        setValueTag(newArr);
        setValue(name, newArr, { shouldValidate: true });
        setInpValue("");
      }
    }
    if (onKeyDown) onKeyDown(e);
  };

  const removeTag = (tag: string) => {
    const newArr = valueTag.filter((el) => el !== tag);
    setValueTag(newArr);
    setValue(name, newArr, { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col flex-1 justify-center !mt-0", className)}>
          <div className="flex justify-between gap-4 mb-2 w-full">
            <div className={`flex justify-start items-center gap-2 text-sm `}>
              <FormLabel className={`text-sm leading-3 font-normal text-label ${textSize} `}>
                {label}
              </FormLabel>
            </div>
            <FormMessage className={`min-w-max text-sm leading-3 font-normal ${textSize}`} />
          </div>
          <FormControl>
            <div className="flex items-center !mt-0 relative ">
              <Input
                id={id}
                type={typeM}
                placeholder={placeholder}
                {...field}
                className={cn(
                  `placeholder:text-sm ${textSize && `placeholder:${textSize}`}`,
                  type === "password" && "pr-12"
                )}
                error={fieldState.invalid}
                onChange={handleChange}
                onKeyDown={handleKeydown}
                value={inpValue}
              />
              {type === "password" && Password}
            </div>
          </FormControl>
          {valueTag.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {valueTag.map((el, i) => (
                <span key={i} className="p-1 border border-border rounded-lg text-sm">
                  {el}{" "}
                  <sup onClick={() => removeTag(el)} className="cursor-pointer">
                    X
                  </sup>
                </span>
              ))}{" "}
            </div>
          )}
          {bottom}
        </FormItem>
      )}
    />
  );
};

export default InputWithLabel;
