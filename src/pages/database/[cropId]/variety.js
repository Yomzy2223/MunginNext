import DropDown from "@/components/CropDetails/DropDown";
import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Variety = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Variety"));
  }, []);

  const varieties = cropDetails.varieties ? cropDetails.varieties : [];

  return (
    <DetailsLayout>
      <VarietyContainer>
        {varieties?.map((variety, i) => (
          <DropDown key={i} title={variety?.types}>
            <ImageWithLabel
              image={variety?.imageUrl}
              list={Object.entries(variety)
                .filter((el) => el[0] !== "id" && el[0] !== "imageUrl")
                .map((el) => ({
                  property: el[0],
                  value: el[1],
                }))}
              imgStyle={{ maxHeight: "100%" }}
            />
          </DropDown>
        ))}
      </VarietyContainer>
    </DetailsLayout>
  );
};

export default Variety;

export const VarietyContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;
