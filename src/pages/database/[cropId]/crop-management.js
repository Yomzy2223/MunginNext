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
  const diseases = cropDetails.diseases ? cropDetails.diseases : [];

  return (
    <DetailsLayout>
      <Section>
        <Title>Pests</Title>
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
      </Section>

      <Section>
        <Title>Diseases</Title>
        <CropManagContainer>
          {diseases?.map((disease, index) => (
            <DropDown key={index} title={disease?.name}>
              <ImageWithLabel
                image={disease?.imageUrl}
                list={Object.entries(disease)
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
      </Section>
    </DetailsLayout>
  );
};

export default CropManagement;

export const CropManagContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const Section = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
