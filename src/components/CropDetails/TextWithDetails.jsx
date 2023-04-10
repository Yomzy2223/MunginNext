import React from "react";
import styled from "styled-components";

const TextWithDetails = ({ title, text }) => {
  return (
    <TextContainer>
      <p>{title}</p>
      <p>{text}</p>
    </TextContainer>
  );
};

export default TextWithDetails;

export const TextContainer = styled.div`
  p {
    :nth-of-type(1) {
      color: #313131;
      font-weight: 700;
      font-size: clamp(17px, 1.7vw, 20px);
      margin-block: 8px;
      text-transform: capitalize;
    }
    :nth-of-type(2) {
      color: #565656;
      font-weight: 400;
      font-size: 14px;
    }
  }
`;
