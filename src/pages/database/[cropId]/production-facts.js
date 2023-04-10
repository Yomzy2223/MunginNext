import TextWithDetails from "@/components/CropDetails/TextWithDetails";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProductionFacts = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Production Facts"));
  }, []);

  const factObj = cropDetails.productionFact ? cropDetails?.productionFact : {};

  return (
    <DetailsLayout>
      <ProdFactsContainer>
        <TextWithDetails
          title="Production Fact"
          text={factObj?.economicImpact}
        />
        <TextWithDetails
          title="Financial Impact"
          text={factObj?.financialImpact}
        />
      </ProdFactsContainer>
    </DetailsLayout>
  );
};

export default ProductionFacts;

const ProdFactsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;
