import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PlantOperations = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Plant Operations"));
  }, []);

  const operationsObj = cropDetails.operations ? cropDetails?.operations : {};
  const operationsArr = operationsObj ? Object.entries(operationsObj) : [];

  let listArr = operationsArr?.filter(
    (each) => each[0] !== "id" && each[0] !== "postHarvestOps"
  );

  const list = listArr.map((list) => ({ property: [list[0]], value: list[1] }));

  return (
    <DetailsLayout>
      <PlantOpContainer>
        <ImageWithLabel
          image={""}
          list={list}
          imgStyle={{ maxHeight: "100%" }}
        />
      </PlantOpContainer>
    </DetailsLayout>
  );
};
export default PlantOperations;

export const PlantOpContainer = styled.div``;
