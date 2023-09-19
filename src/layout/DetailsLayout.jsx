import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DetailsHeader from "../components/header";
import Sidebar from "../components/sidebar/index";
import { storeCropDetails } from "../redux/slices";
import { store } from "../redux/store";
import { getCropDetails } from "../services/map.service";

const DetailsLayout = ({ children }) => {
  const [cropName, setCropName] = useState(false);

  const { title, cropDetails } = useSelector((store) => store.database);

  // Get crop Id from the location pathname
  const { query } = useRouter();
  let cropId = query.cropId;

  useEffect(() => {
    handleCropDetails();
  }, [cropName]);

  const handleCropDetails = async () => {
    let details = await getCropDetails(cropId);
    store.dispatch(storeCropDetails(details ? details : {}));
    setCropName(details?.commonName);
  };

  return (
    <>
      <Head>
        <title>Mungin: {cropName} database</title>
      </Head>
      <DetailsContainer>
        <Sidebar desktop />
        <ContentWrapper>
          <DetailsHeader title={title} />
          {children}
        </ContentWrapper>
      </DetailsContainer>
    </>
  );
};

export default DetailsLayout;

//

//

export const DetailsContainer = styled.div`
  display: flex;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding-inline: 32px;
  max-height: 100vh;
  overflow-y: scroll;
  padding-bottom: 40px;
`;
