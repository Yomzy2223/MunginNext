import React from "react";
import styled from "styled-components";

const MapHeader = ({ lng, lat, zoom }) => {
  return (
    <Container>
      <div>{lng}</div>
      <div>{lat}</div>
      <div>{zoom}</div>
    </Container>
  );
};

export default MapHeader;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  gap: 16px;
  z-index: 1;
`;
