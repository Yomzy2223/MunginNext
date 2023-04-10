import DropDown from "@/components/CropDetails/DropDown";
import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CropManagement = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Crop Management"));
  }, []);

  const pests = cropDetails.pests ? cropDetails.pests : [];

  return (
    <DetailsLayout>
      <CropManagContainer>
        {pests?.map((pest, index) => (
          <DropDown key={index} title={pest?.name}>
            <ImageWithLabel
              image={pest?.imageUrl}
              list={Object.entries(pest)
                .filter((el) => el[0] !== "id" && el[0] !== "imageUrl")
                .map((el) => ({
                  property: el[0],
                  value: el[1],
                }))}
              imgStyle={{ maxHeight: "100%" }}
            />
          </DropDown>
        ))}
      </CropManagContainer>
    </DetailsLayout>
  );
};

export default CropManagement;

export const CropManagContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;
