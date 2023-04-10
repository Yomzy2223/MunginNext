import React from "react";
import styled from "styled-components";
import ImageList from "./ImageList";

const DetailList = ({ title, text, array }) => {
  return (
    <DetailListContainer>
      <Text>
        <p>{title}</p>
        <p>{text}</p>
      </Text>
      <ImagesWrapper>
        {array.map((arr) => (
          <ImageList image={arr?.img} text={arr?.text} title={arr?.title} />
        ))}
      </ImagesWrapper>
    </DetailListContainer>
  );
};

export default DetailList;

export const DetailListContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export const Text = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;

  p {
    :nth-of-type(1) {
      font-weight: 700;
      font-size: clamp(17px, 1.7vw, 20px);
      color: #313131;
    }
    :nth-of-type(2) {
      font-weight: 400;
      font-size: 14px;
      color: #565656;
    }
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  gap: 40px;
`;
