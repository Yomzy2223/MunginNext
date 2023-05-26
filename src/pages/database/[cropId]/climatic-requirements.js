import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ClimaticRequirements = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Climatic Requirement"));
  }, []);

  const climaticsObj = cropDetails.climaticRequirement
    ? cropDetails?.climaticRequirement
    : {};

  const climaticReqArr = climaticsObj ? Object.entries(climaticsObj) : [];

  let listArr = climaticReqArr?.filter(
    (each) => each[0] !== "id" && each[0] !== "atmosphericGas"
  );

  let loaded = listArr?.length > 0;

  const list = [
    {
      property: loaded ? listArr[0][0] : "",
      value: loaded ? listArr[0][1] : "",
    },
    {
      property: loaded ? listArr[1][0] : "",
      value: loaded ? listArr[1][1] : "",
    },
    {
      property: loaded ? listArr[2][0] : "",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {loaded ? listArr[2][1] : ""}
        </div>
      ),
    },
    {
      property: loaded ? listArr[3][0] : "",
      value: (
        <div style={{ textTransform: "lowercase" }}>
          {loaded ? listArr[3][1] : ""}
        </div>
      ),
    },
  ];

  //   const list = listArr.map((list) => ({ property: [list[0]], value: list[1] }));

  return (
    <DetailsLayout>
      <ClimaticContainer>
        <ImageWithLabel
          image={""}
          list={list}
          imgStyle={{ maxHeight: "100%" }}
        />
      </ClimaticContainer>
    </DetailsLayout>
  );
};

export default ClimaticRequirements;

export const ClimaticContainer = styled.div``;
