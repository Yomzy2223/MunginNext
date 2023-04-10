import TextWithDetails from "@/components/CropDetails/TextWithDetails";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Description = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Description"));
  }, []);

  const description = cropDetails.cropDescription
    ? cropDetails.cropDescription
    : {};

  const descArray = Object.entries(description ? description : [])?.filter(
    (each) => each[0] !== "id"
  );

  return (
    <DetailsLayout>
      <DescriptionContainer>
        {descArray.map((desc, index) => (
          <TextWithDetails key={index} title={desc[0]} text={desc[1]} />
        ))}
      </DescriptionContainer>
    </DetailsLayout>
  );
};

export default Description;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;
