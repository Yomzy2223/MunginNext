import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import TextWithDetails from "@/components/CropDetails/TextWithDetails";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Morphology = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Morphology"));
  }, []);

  const morphologyObj = cropDetails.morphology ? cropDetails?.morphology : {};

  let imageIncluded = morphologyObj?.root?.includes("http");

  const image = imageIncluded ? morphologyObj?.root : "";

  let branches = morphologyObj?.branches;
  let flower = morphologyObj?.flower;
  let foilage = morphologyObj?.foliage;
  let fruit = morphologyObj?.fruit;
  let root = morphologyObj?.root?.includes("http") ? "" : morphologyObj?.root;
  let seed = morphologyObj?.seed;
  let stem = morphologyObj?.stem;

  return (
    <DetailsLayout>
      <Wrapper>
        {image && (
          <ImageWithLabel
            image={image ? image : ""}
            list={[]}
            imgStyle={{ maxHeight: "100%" }}
          />
        )}
        {branches && <TextWithDetails title="Branches" text={branches} />}
        {flower && <TextWithDetails title="Flower" text={flower} />}
        {foilage && <TextWithDetails title="Foliage" text={foilage} />}
        {fruit && <TextWithDetails title="Fruit" text={fruit} />}
        {root && <TextWithDetails title="Root" text={root} />}
        {seed && <TextWithDetails title="Seed" text={seed} />}
        {stem && <TextWithDetails title="Stem" text={stem} />}
      </Wrapper>
    </DetailsLayout>
  );
};

export default Morphology;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;
