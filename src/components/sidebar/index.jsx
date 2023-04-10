import React from "react";
import styled from "styled-components";
import SidebarList from "./SidebarList";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { MunginLogo } from "@/assets/images";
import Image from "next/image";
import { sidebarList } from "@/utils/config";

const Sidebar = ({ desktop, setOpen = () => {} }) => {
  return (
    <SidebarContainer $desktop={desktop}>
      <Top>
        {desktop ? (
          <Link href="/">
            <Image src={MunginLogo} alt="" />
          </Link>
        ) : (
          <IoClose
            size={24}
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
          />
        )}
      </Top>
      <Middle>
        {sidebarList.map((list, index) => (
          <SidebarList
            n
            key={index}
            text={list.text}
            Icon={list.icon}
            link={list.path}
            onClick={() => setOpen(false)}
          />
        ))}
      </Middle>
    </SidebarContainer>
  );
};

export default Sidebar;

export const SidebarContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 8px;
  max-height: 100vh;
  max-width: 258px;
  min-width: 258px;
  overflow-y: scroll;
  box-shadow: 2px 0 1px #ebebebd1;
  padding-bottom: 40px;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 700px) {
    display: ${({ $desktop }) => $desktop && "none"};
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
  padding: 32px 48px;
  border-bottom: 1px solid #ebebeb;
`;

export const Middle = styled.div``;
