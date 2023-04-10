import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { activeStyle, IconWrapper, SidebarListContainer } from "./styled";

const SidebarList = ({ Icon, text, link, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  const path = router.asPath;
  const newPath = path.slice(0, path.lastIndexOf("/"));
  const to = newPath + `/${link}`;

  return (
    <SidebarListContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <Link href={to} style={path === to ? activeStyle : {}}>
        <IconWrapper>
          <Icon active={hovered || path === to} />
        </IconWrapper>
        <span>{text}</span>
      </Link>
    </SidebarListContainer>
  );
};

export default SidebarList;
