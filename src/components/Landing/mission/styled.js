import Image from "next/image";
import styled from "styled-components";
import { plantation } from "../../../assets/images";

export const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding-top: 30px;

  @media screen and (max-width: 420px) {
    transform: scale(0.8);
  }
`;

export const Body = styled.div`
  display: flex;
`;

export const TreeImg = styled(Image)`
  max-height: 656px;
  min-width: 80px;
  width: 20vw;
  max-width: 256px;
  /* max-width: 256px; */
  object-fit: contain;
`;

export const pointerStyleLeft = {
  transform: "rotate(0deg)",
};
export const pointerStyleRight = {
  transform: "rotate(180deg)",
};

//

export const PointerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 700;
  font-size: clamp(14px, 1.5vw, 18px);
  color: #313131;

  span {
    max-width: max-content;
    text-align: ${({ position }) => (position === "left" ? "right" : "left")};

    @media screen and (max-width: 800px) {
      align-self: ${({ position }) =>
        position === "left" ? "flex-start" : "flex-end"};
    }
  }

  @media screen and (max-width: 800px) {
    flex-flow: ${({ position }) =>
      position === "left" ? "column-reverse" : "column"};
  }
`;
export const Pointer = styled.div`
  display: flex;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 70px;
  align-items: flex-end;
  margin-right: 15px;
`;

export const Right = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 70px;
  align-items: flex-start;
`;

export const PointerImage = styled(Image)`
  position: relative;
  top: ${({ $bottom, $top }) => ($bottom ? "-18px" : $top ? "18px" : "")};
  transform: ${({ $left }) => $left && "rotateY(180deg)"};
  max-width: 86px;
  /* max-height: 55px; */
`;

export const IconWrapper = styled.div`
  background: #ffffff;
  border: 3px solid rgba(218, 218, 218, 0.4);
  border-radius: 8px;
  min-width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -5px 5px 10px #f2f2f2;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  gap: 10px;
  font-size: 25px;

  > p {
    color: #7d7d7d;
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 23px;
    max-width: 461px;
    text-align: center;
  }

  div {
    color: #3b7525;
    font-family: "Rubik Bubbles";

    img {
      position: relative;
      left: 12%;
      top: 10px;
      min-width: 25px;
      width: 2vw;
      max-width: 34px;
      height: auto;
    }
  }
`;
