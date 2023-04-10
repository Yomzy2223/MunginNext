import React from "react";
import styled from "styled-components";

const Empty = () => {
  return <EmptyContainer>No Information</EmptyContainer>;
};

export default Empty;

export const EmptyContainer = styled.p`
  color: #9c9c9c;
`;
