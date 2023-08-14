import React, { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { getSignUpSchema } from "./constants";
import InputWithLabel from "@/components/Inputs/inputWithLabel";
import CMSelect from "@/components/cmSelect";
import Image from "next/image";
import profilesvg from "@/assets/icons/profile.svg";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { createNewSwiper } from "./actions";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";
import SwipeContent from "./swipeContent";
import * as z from "zod";
import PhoneNumInput from "@/components/Inputs/phoneInput";
import PhoneInput from "react-phone-input-2";

const SignUpNew = () => {
  const [farmNumbers, setfarmNumbers] = useState(0);
  const [visibleFarm, setVisibleFarm] = useState(1);

  const { query } = useRouter();

  const signUpSchema = getSignUpSchema(farmNumbers);
  type signUpTypes = z.infer<typeof signUpSchema>;

  // 1. Define your form.
  const form = useForm<signUpTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: signUpTypes) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    createNewSwiper();
    setVisibleFarm(1);
  }, [farmNumbers]);

  const handlePaginationClick = () => {
    const active = document.querySelector(".swiper-pagination-bullet-active");
    active?.parentNode?.childNodes?.forEach((el: any, i) => {
      if (el === active) setVisibleFarm(i + 1);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3 m-auto ">
        <div className="flex flex-col items-center gap-4 justify-center">
          <Image src={profilesvg} alt="" />
          <p className="text-3xl font-semibold ">JOIN US</p>
        </div>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            form={form}
            name="fullname"
            label="Fullname"
            placeholder="Enter your fullname"
          />
          <div className="flex gap-4">
            <PhoneNumInput form={form} name="phone1" label="Phone number 1" />
            <PhoneNumInput form={form} name="phone2" label="Phone number 2" />
          </div>

          <div className="flex gap-4">
            <InputWithLabel
              form={form}
              name="email"
              label="Email Address"
              placeholder="example@example.com"
              type="email"
            />
            <InputWithLabel
              form={form}
              name="password"
              label="Password"
              placeholder="Must be at least 6 characters"
              type="password"
            />
          </div>
          <div className="flex gap-4">
            <InputWithLabel
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Must match the current password"
              type="password"
            />
            <CMSelect
              name="gender"
              mainLabel="Gender"
              placeholder="Select your gender"
              options={["Male", "Female"]}
              defaultValue=""
            />
          </div>
          <div className="w-1/2 m-auto">
            <InputWithLabel
              form={form}
              name="farmsNumber"
              label="Number of farms"
              placeholder="Enter the number of farms you have.  e.g. 5"
              type="number"
              onChange={(e) => setfarmNumbers(e.target.value)}
            />
          </div>
        </div>

        {farmNumbers > 0 && query.user === "farmer" && (
          <div className="relative">
            <div className="border border-input rounded-lg p-6 w-2/3 m-auto">
              <p className="absolute -top-3 bg-white px-6 text-sm font-semibold ">
                Farm {visibleFarm}
              </p>
              <Swiper>
                <SwiperWrapper>
                  {Array.from({ length: farmNumbers }, () => "").map((el, i) => (
                    <SwipeContent key={i} i={i} form={form} />
                  ))}
                </SwiperWrapper>
              </Swiper>
            </div>
            <div className="swiper-pagination" onClick={handlePaginationClick}></div>
            <div className="swiper-button-prev" onClick={() => setVisibleFarm(visibleFarm - 1)}>
              Prev
            </div>
            <div className="swiper-button-next" onClick={() => setVisibleFarm(visibleFarm + 1)}>
              Next
            </div>
          </div>
        )}

        <div className="flex justify-center w-2/3 m-auto">
          <Button size="full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpNew;

const Swiper = ({ children }: { children: ReactNode }) => {
  return <div className="swiper">{children}</div>;
};

const SwiperWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="swiper-wrapper">{children}</div>;
};

//

//  <div className="space-y-1 flex-1">
//    <label htmlFor="phone1" className="text-sm">
//      Phone number 1
//    </label>
//    <PhoneInput
//      country={"ng"}
//      value={phone}
//      onChange={(phone) => setPhone(phone)}
//      preferredCountries={["ng"]}
//      placeholder="8137726622"
//      inputProps={{
//        name: "phone1",
//        required: true,
//        autoFocus: true,
//      }}
//      buttonClass="h-10"
//      inputStyle={{ height: "40px", width: "100%" }}
//    />
//    <div className="space-y-1 flex-1">
//      <label htmlFor="phone" className="text-sm">
//        Phone number 2
//      </label>
//      <PhoneInput
//        country={"ng"}
//        value={phone}
//        onChange={(phone) => setPhone(phone)}
//        preferredCountries={["ng"]}
//        placeholder="8137726622"
//        inputProps={{
//          name: "phone2",
//          required: true,
//          autoFocus: true,
//        }}
//        buttonClass="h-10"
//        inputStyle={{ height: "40px", width: "100%" }}
//      />
//    </div>
//  </div>;
