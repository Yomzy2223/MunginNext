import Image from "next/image";
import React from "react";
import styled from "styled-components";

const ImageWithLabel = ({ image, list, imgStyle, style }) => {
  return (
    <ImageLabelContainer style={style}>
      {image && (
        <Image
          src={image}
          alt="crop"
          style={imgStyle}
          width={300}
          height={300}
        />
      )}
      <Label>
        {list?.map((each, index) => (
          <List key={index}>
            <Property>
              <span>{each?.property}</span>
            </Property>
            <span style={each.valueStyle}>
              {each?.value ? each.value : "----"}
            </span>
          </List>
        ))}
      </Label>
    </ImageLabelContainer>
  );
};

export default ImageWithLabel;

export const ImageLabelContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  height: inherit;

  > img {
    height: 100%;
    object-fit: contain;
    width: max-content;
    max-height: 334px;
    max-width: 400px;
    border-radius: 8px;
  }
`;

export const Label = styled.div`
  display: flex;
  flex-flow: column;
  gap: 22px;
`;

export const List = styled.div`
  display: flex;

  > span {
    font-size: 12px;
    border-radius: 4px;
    /* width: max-content; */
    height: max-content;

    color: #313131;
    text-transform: capitalize;
    text-transform: capitalize;
  }
  @media screen and (max-width: 250px) {
    flex-flow: column;
    gap: 16px;
  }
`;

export const Property = styled.div`
  min-width: 150px;
  max-width: 150px;
  span {
    font-size: 12px;
    border-radius: 4px;
    width: max-content;
    height: max-content;
    text-align: justify;
    text-transform: capitalize;
    color: #75a843;
    background-color: #e2efd5;
    font-weight: 700;
    padding: 8px;
  }
`;
