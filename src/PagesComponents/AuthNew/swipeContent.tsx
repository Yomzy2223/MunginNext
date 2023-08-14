import CMSelect from "@/components/cmSelect";
import InputWithLabel from "@/components/Inputs/inputWithLabel";
import React, { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

const SwipeContent = ({ form, i }: { form: any; i: number }) => {
  const [type, setType] = useState("");

  return (
    <SwiperSlide>
      <div className="flex gap-4">
        <InputWithLabel
          form={form}
          name={`farmName${i}`}
          label="Farm name"
          placeholder="e.g. Alagbado farm"
        />
        <InputWithLabel
          form={form}
          name={`location${i}`}
          label="Location"
          placeholder="e.g. Lagos"
        />
      </div>
      <div className="flex gap-4">
        <CMSelect
          name={`farmType${i}`}
          mainLabel="Farm type"
          placeholder="Select farm type"
          options={["Crop farming", "Animal farming", "Mixed farming"]}
          handleSelect={(selected) => {
            setType(selected.toLowerCase());
          }}
          defaultValue=""
        />
        <InputWithLabel
          form={form}
          name={`farmSize${i}`}
          label="Farm size"
          placeholder="e.g. 2 hectares"
          className="flex-1"
        />
      </div>
      {(type === "animal farming" || type === "mixed farming") && (
        <div>
          <InputWithLabel
            form={form}
            name={`animalNames${i}`}
            label="Animal names - Quantity"
            placeholder="e,g Goat - 12"
            className="flex-1"
            type="array"
            id="farm-animal-names"
          />
        </div>
      )}
      {(type === "crop farming" || type === "mixed farming") && (
        <div>
          <InputWithLabel
            form={form}
            name={`cropNames${i}`}
            label="Crop names"
            placeholder="e.g Maize"
            className="flex-1"
            type="array"
            id="farm-crop-names"
          />
        </div>
      )}
    </SwiperSlide>
  );
};

export default SwipeContent;

const SwiperSlide = ({ children }: { children: ReactNode }) => {
  return <div className="swiper-slide p-1 space-y-4">{children}</div>;
};
