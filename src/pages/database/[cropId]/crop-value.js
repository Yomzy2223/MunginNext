import ListWithTitle from "@/components/CropDetails/ListWithTitle";
import TextWithDetails from "@/components/CropDetails/TextWithDetails";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CropValue = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Crop Value"));
  }, []);

  const cropValue = cropDetails.cropValue ? cropDetails?.cropValue : {};

  return (
    <DetailsLayout>
      <CropValueContainer>
        <ListWithTitle
          list={cropValue?.byProduct?.split(",")}
          title="By Product"
        />
        <TextWithDetails
          title="Economic Value"
          text={cropValue?.economicValue}
        />
      </CropValueContainer>
    </DetailsLayout>
  );
};

export default CropValue;

export const CropValueContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
`;
