import styled from "styled-components";

export const SidebarListContainer = styled.div`
  a {
    display: flex;
    gap: 20px;
    padding: 16.5px 20px 16.5px 40px;
    min-width: 258px;
    transition: 0.3s all ease;
    font-weight: 400;
    text-decoration: none;

    :hover {
      color: #778761;
      background-color: #f4f4f4;
      font-weight: 700;
    }
  }

  span {
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    text-transform: capitalize;
    white-space: nowrap;
  }

  path {
    transition: 0.3s ease all;
  }
`;

export const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
`;

export const activeStyle = {
  color: "#778761",
  backgroundColor: "#f4f4f4",
  fontWeight: 700,
};
