import React, { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { getFarmerSchema } from "./constants";
import InputWithLabel from "@/components/Inputs/inputWithLabel";
import CMSelect from "@/components/cmSelect";
import Image from "next/image";
import profilesvg from "@/assets/icons/profile.svg";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { createNewSwiper, getSignUpSchema } from "./actions";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";
import SwipeContent from "./swipeContent";
import * as z from "zod";
import PhoneNumInput from "@/components/Inputs/phoneInput";
import {
  registerFarmer,
  registerIndividual,
  registerInstitution,
  registerInvestor,
  registerServiceProvider,
} from "@/services/auth.service.js";
import { Oval } from "react-loading-icons";

const SignUpNew = () => {
  const [farmNumbers, setfarmNumbers] = useState(0);
  const [farmType, setFarmType] = useState([]);
  const [visibleFarm, setVisibleFarm] = useState(1);
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();
  const { user } = query;

  const signUpSchema = getSignUpSchema(user) || getFarmerSchema(farmNumbers, farmType);
  type signUpTypes = z.infer<typeof signUpSchema>;

  // 1. Define your form.
  const form = useForm<signUpTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: signUpTypes) => {
    setLoading(true);
    console.log(values);
    if (user === "farmer") await registerFarmer(values);
    if (user === "institution") await registerInstitution(values);
    if (user === "investor") await registerInvestor(values);
    if (user === "service-provider") await registerServiceProvider(values);
    if (user === "individual") await registerIndividual(values);
    setLoading(false);
  };

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

  const handleFarmNumChange = (e: any) => {
    setfarmNumbers(e.target.value);
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
            <PhoneNumInput form={form} name="phone" label="Phone number 1" />
            {user === "farmer" && (
              <PhoneNumInput form={form} name="phone2" label="Phone number 2" />
            )}
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

            {user === "service-provider" ? (
              <InputWithLabel
                form={form}
                name="serviceOffering"
                label="Service offering"
                placeholder="Maize distribution"
              />
            ) : (
              <CMSelect
                name="gender"
                mainLabel="Gender"
                placeholder="Select your gender"
                options={["Male", "Female"]}
                defaultValue=""
              />
            )}
          </div>

          {user === "institution" && (
            <div className="flex gap-4">
              <InputWithLabel
                form={form}
                name="institutionName"
                label="Institution name"
                placeholder="Johnson & sons Inc."
              />
              <InputWithLabel
                form={form}
                name="location"
                label="Institution location"
                placeholder="Workstation, VI Lagos."
              />
            </div>
          )}

          {user === "investor" && (
            <div className="flex gap-4">
              <InputWithLabel
                form={form}
                name="companyName"
                label="Company name"
                placeholder="Johnson & sons Inc."
              />
              <InputWithLabel
                form={form}
                name="companyWebsite"
                label="Company website"
                placeholder="https://www.example.com"
              />
            </div>
          )}

          <div className="flex gap-4">
            {(user === "institution" || user === "investor") && (
              <InputWithLabel
                form={form}
                name="areaOfInterest"
                label="Area of interest"
                placeholder="Agricultural science"
              />
            )}
          </div>
          <div className="flex gap-4">
            {user === "farmer" && (
              <InputWithLabel
                form={form}
                name="farmsNumber"
                label="Number of farms"
                placeholder="Enter the number of farms you have.  e.g. 5"
                type="number"
                onChange={handleFarmNumChange}
              />
            )}
          </div>
        </div>

        {farmNumbers > 0 && user === "farmer" && (
          <div className="relative">
            <div className="border border-input rounded-lg p-6 w-2/3 m-auto">
              <p className="absolute -top-3 bg-white px-6 text-sm font-semibold ">
                Farm {visibleFarm}
              </p>
              <Swiper>
                <SwiperWrapper>
                  {Array.from({ length: farmNumbers }, () => "").map((el, i) => (
                    <SwipeContent
                      key={i}
                      i={i}
                      form={form}
                      farmType={farmType}
                      setFarmType={setFarmType}
                    />
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
            {loading ? <Oval stroke="#fff" className="w-5 h-5 " /> : "Submit"}
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
