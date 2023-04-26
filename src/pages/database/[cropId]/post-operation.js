import ListWithTitle from "@/components/CropDetails/ListWithTitle";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PostOperation = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Post Operations"));
  }, []);

  const operations = cropDetails.operations
    ? cropDetails?.operations.postHarvestOps
    : "";

  console.log(operations);
  return (
    <DetailsLayout>
      <PostHarvestContainer>
        <ListWithTitle
          title={`The post-harvest operations of ${cropDetails?.cropName} include:`}
          list={[...operations?.split(",")]}
        />
      </PostHarvestContainer>
    </DetailsLayout>
  );
};

export default PostOperation;

export const PostHarvestContainer = styled.div``;
