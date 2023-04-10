import React, { useState } from "react";
import { MdOutlineArrowRight } from "react-icons/md";
import styled from "styled-components";

const DropDown = ({ title, children }) => {
  const [hide, setHide] = useState(true);
  return (
    <Container>
      <Top onClick={() => setHide(!hide)}>
        <Icon $hide={hide}>
          <MdOutlineArrowRight size={20} />
        </Icon>
        <p>{title}</p>
      </Top>
      <Content $hide={hide}>{children}</Content>
    </Container>
  );
};

export default DropDown;

export const Container = styled.div`
  /* background-color: yellow; */
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #313131;
  cursor: pointer;
  margin-bottom: 10px;
  width: max-content;

  > p {
    font-weight: 700;
    font-size: 16px;
    text-transform: capitalize;
  }
`;

export const Icon = styled.div`
  transition: 0.3s ease all;
  transform: ${({ $hide }) => ($hide ? "rotate(0deg)" : " rotate(90deg);")};
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  height: ${({ $hide }) => ($hide ? "0" : "calc(100% - 27px)")};
  overflow: hidden;
  transition: 0.3s ease height;
  padding-left: 30px;
  /* background-color: blue; */
`;
