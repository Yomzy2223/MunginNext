import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import Empty from "@/components/Empty";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SoilRequirements = () => {
  const { cropDetails } = useSelector((store) => store.database);
  useEffect(() => {
    store.dispatch(storeTitle("Soil Requirements"));
  }, []);

  const soilArrr = cropDetails?.soilRequirement
    ? cropDetails?.soilRequirement[0]
    : [];

  const list = [
    {
      property: "Caption Exchange",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {soilArrr?.cationXchange}
        </div>
      ),
    },
    {
      property: "Moisture Content",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {soilArrr?.moistureContent}
        </div>
      ),
    },
    {
      property: "Organic Matter",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {soilArrr?.organicMatter}
        </div>
      ),
    },
    {
      property: "Soil PH",
      value: soilArrr?.soilPH,
    },
    {
      property: "Soil Type",
      value: soilArrr?.soilType,
    },
    {
      property: "Texture",
      value: soilArrr?.texture,
    },
  ];

  return (
    <DetailsLayout>
      <SoilReqContainer>
        {list.length > 0 ? (
          <ImageWithLabel
            image={""}
            list={list}
            imgStyle={{ maxHeight: "100%" }}
          />
        ) : (
          <Empty />
        )}
      </SoilReqContainer>
    </DetailsLayout>
  );
};

export default SoilRequirements;

export const SoilReqContainer = styled.div``;
