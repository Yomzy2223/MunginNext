import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArticleImg } from "../../../assets/images/ArticleImg.svg";

const ArticlesCard = ({ date, title, text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hovered={hovered}
    >
      <Image>
        <ArticleImg />
      </Image>
      <Text>
        <p>{date}</p>
        <p>{title}</p>
        <p>{text}</p>
        <button>Read More</button>
      </Text>
    </Container>
  );
};

export default ArticlesCard;

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  max-width: 260px;
  background-color: #fafafa;
  border-radius: 16px 16px 8px 8px;
  box-shadow: ${({ hovered }) =>
    hovered ? "0 5px 25px #1e1e1e4a" : "0 5px 25px #3b3b3b32"};
  transform: ${({ hovered }) => (hovered ? "scale(1.05)" : "")};
  transition: 0.3s all ease;
`;

export const Image = styled.div``;

export const Text = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  font-family: "Raleway";
  margin-inline: 16px;

  p {
    :nth-of-type(1) {
      margin-bottom: 4px;
      font-weight: 600;
      font-size: clamp(10px, 1.2vw, 12px);
      line-height: 14px;
      text-align: center;
      text-transform: uppercase;
      color: #83bf4f;
    }
    :nth-of-type(2) {
      font-weight: 700;
      font-size: clamp(14px, 1.4vw, 16px);
      line-height: 19px;
      text-transform: uppercase;
      color: #0a0a0a;
    }
    :nth-of-type(3) {
      font-weight: 500;
      font-size: clamp(11px, 1.1vw, 13px);
      line-height: 22px;
      color: #686666;
    }
  }

  button {
    font-weight: 800;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    text-transform: uppercase;
    color: #83bf4f;
    margin-right: ${({ hovered }) => (hovered ? "30px" : "15px")};
    margin-block: 18px 20px;
  }
`;
