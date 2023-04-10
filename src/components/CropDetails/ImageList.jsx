import React from "react";
import styled from "styled-components";
import { tickCircle } from "../../../assets/images";

const ImageList = ({ title, text, image }) => {
  return (
    <ImageListContainer>
      {title && (
        <div>
          <img src={tickCircle} alt="" />
          <p>{title} </p>
        </div>
      )}
      {image && <img src={image} alt="" />}
      {text && <span>{text}</span>}
    </ImageListContainer>
  );
};

export default ImageList;

export const ImageListContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;

  div {
    display: flex;
    gap: 12px;
    color: #313131;
    font-weight: 700;
    font-size: clamp(17px, 1.7vw, 20px);
  }

  > img {
    height: 100%;
    max-height: 275px;
    width: max-content;
    object-fit: contain;
    border-radius: 8px;
  }

  span {
    color: #565656;
    font-weight: 400;
    font-size: 14px;
  }
`;
