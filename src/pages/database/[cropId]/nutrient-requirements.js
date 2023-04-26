import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NutrientRequirements = () => {
  const [list, setList] = useState([]);

  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Nutrient Requirements"));
  }, []);

  useEffect(() => {
    if (cropDetails.nutrient) {
      const dataList = [
        {
          property: "Micro Quantity",
          value: cropDetails?.nutrient[0].microQuantity,
        },
        {
          property: "Macro Quantity",
          value: cropDetails?.nutrient[0].macroQuantity,
        },
      ];
      setList(dataList);
    }
  }, [cropDetails?.nutrient?.length]);

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
