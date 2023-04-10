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

  const operationsObj = cropDetails.operations
    ? cropDetails?.operations.postHarvestOps
    : {};

  return (
    <DetailsLayout>
      <PostHarvestContainer>
        <ListWithTitle
          title={`The post-harvest operations of ${cropDetails?.cropName} include:`}
          list={[...operationsObj?.split(",")]}
        />
      </PostHarvestContainer>
    </DetailsLayout>
  );
};

export default PostOperation;

export const PostHarvestContainer = styled.div``;
