import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NutrientRequirements = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Nutrient Requirements"));
  }, []);

  const nutrients = cropDetails?.nutrient[0];
  const list = nutrients
    ? [
        { property: "Micro Quantity", value: nutrients.microQuantity },
        { property: "Macro Quantity", value: nutrients.macroQuantity },
      ]
    : {};

  return (
    <DetailsLayout>
      <NutrientReqContainer>
        <ImageWithLabel
          image={""}
          list={list}
          imgStyle={{ maxHeight: "100%" }}
        />
      </NutrientReqContainer>
    </DetailsLayout>
  );
};

export default NutrientRequirements;

export const NutrientReqContainer = styled.div``;
