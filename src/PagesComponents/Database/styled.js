import styled from "styled-components";

export const Container = styled.div`
  font-size: 14px;
  max-width: 1000px;
  margin: auto;
  padding-inline: clamp(15px, 2vw, 32px);
  color: #313131;
`;
export const Header = styled.div`
  display: flex;
  flex-flow: column;
  gap: clamp(20px, 4vw, 48px);
  padding-block: clamp(20px, 4vw, 48px);
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const ProfileImg = styled.div`
  display: flex;
  gap: 8px;
`;

export const Middle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;
export const MiddleLeft = styled.div`
  display: flex;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(8px, 1.2vw, 15px);
    border: 0.6px solid #e5e5e5;
    border-radius: 2px;

    :nth-of-type(2) {
      font-weight: 700;
    }
  }
`;
export const MiddleRight = styled.div`
  display: flex;
  gap: clamp(0px, 2vw, 32px);

  > div {
    position: relative;
    display: flex;

    > span {
      position: absolute;
      top: 35%;
      right: clamp(10px, 1.2vw, 15px);
    }
  }

  input {
    padding: clamp(8px, 1.2vw, 15px);
    border: 1px solid #e5e5e566;
    border-radius: 6px;
    max-width: 327px;
    min-width: 200px;
    width: 100%;
    outline: none;

    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  button {
    display: flex;
    background-color: #17233c;
    color: white;
    padding: clamp(8px, 1.2vw, 15px);
    white-space: nowrap;
    border-radius: 4px;
    border: none;
    outline: none;
  }
`;
export const Main = styled.div`
  div {
    span {
      font-weight: 700;
      margin-right: 5px;
    }
  }
  table {
    width: 100%;
    a {
      display: flex;
    }
  }
  thead {
    span {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    td {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
    }
  }
  td {
    padding-block: 16px;
    text-transform: capitalize;
  }
`;
export const More = styled.td`
  padding-top: 22px;
  float: right;
`;
export const CropName = styled.td`
  width: 60%;
  font-weight: 700;
  color: #75a843;
  padding: 0 0 8px !important;

  a {
    text-decoration: none;
    color: inherit;
    padding-block: 8px;
  }
`;
