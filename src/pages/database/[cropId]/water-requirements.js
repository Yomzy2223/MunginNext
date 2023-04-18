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
    store.dispatch(storeTitle("Water Requirements"));
  }, []);

  console.log(cropDetails);

  const waterReq = cropDetails?.soilRequirement
    ? cropDetails?.waterRequirement
    : [];

  const list = [
    {
      property: "Maximum Quality",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {waterReq?.maxQuantity}
        </div>
      ),
    },
    {
      property: "Minimum Quality",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {waterReq?.minQuantity}
        </div>
      ),
    },
    {
      property: "Water Source Name",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {waterReq?.waterSourceName}
        </div>
      ),
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
