import React, { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import MobileDetailsSidebar from "../sidebar/MobileDetailsSidebar";

const DetailsHeader = ({ title }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Container>
      <TopContainer>
        <Top>
          <Link href="/database">
            <MdKeyboardArrowLeft /> Back
          </Link>
          <MobileDetailsSidebar
            open={openSidebar}
            setOpen={setOpenSidebar}
            anchor="right"
          />
          {/* <span>
            <img src={profileImg} alt="profile" />
            <MdKeyboardArrowDown />
          </span> */}
        </Top>
        <MenuIcon
          onClick={() => setOpenSidebar(true)}
          style={{ cursor: "pointer" }}
        >
          <HiOutlineMenu size={24} />
        </MenuIcon>
      </TopContainer>
      <p>{title}</p>
    </Container>
  );
};

export default DetailsHeader;

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 27px;

  p {
    font-weight: 700;
    font-size: clamp(22px, 2.2vw, 28px);
    color: #313131;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  padding-block: 40px 35px;
  align-items: center;
  gap: 10px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  a,
  span {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #888888;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  /* @media screen and (max-width: 700px) {
    a {
      display: none;
    }
  } */
`;

export const MenuIcon = styled.div`
  display: block;

  @media screen and (min-width: 701px) {
    display: none;
  }
`;
