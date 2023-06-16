import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 16px;
  max-width: 250px;
  transform: ${({ hovered }) => (hovered ? "scale(1.05)" : "")};
  transition: 0.3s transform ease;
`;

export const ImageContainer = styled.div`
  background-color: ${({ hovered }) => (hovered ? "#75A843" : "#fff")};
  transition: 0.3s background-color ease;
  border-radius: 8px;
`;

export const Image = styled.div`
  padding: 22px;
  border: 3px solid #dadada40;
  border-radius: 8px;

  svg,
  path {
    transition: 0.3s ease all;
  }
`;

export const Title = styled.div`
  font-family: "Montserrat Alternates";
  color: ${({ hovered }) => (hovered ? "#000" : "#000000bf")};
  font-weight: 700;
  font-size: clamp(15px, 1.5vw, 17px);
  line-height: 21px;
`;

export const Text = styled.div`
  color: ${({ hovered }) => (hovered ? "#5c5c5c" : "#979797")};
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: clamp(12px, 1.2vw, 14px);
  line-height: 20px;
  transition: 0.3s color ease;
  text-align: center;
`;
