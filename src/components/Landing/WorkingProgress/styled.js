import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  align-self: center;
  justify-self: center;
  gap: 47px;
  width: 100%;
  max-width: 900px;
  padding-top: 30px;
`;

export const Top = styled.div`
  p {
    /* font-family: "Montserrat Alternates"; */
    font-family: "Cutest Things", sans-serif;
    text-align: center;
    font-weight: 500;

    :nth-of-type(1) {
      font-size: 12px;
      line-height: 15px;
      text-transform: uppercase;
      font-size: clamp(12px, 1.2px, 13px);

      color: #ababab;
    }

    :nth-of-type(2) {
      font-size: clamp(22px, 2.2px, 26px);
      line-height: 32px;
      text-transform: capitalize;
      margin-top: 7px;
      color: #313131;

      background: linear-gradient(90deg, #313131, rgb(131, 191, 79), #313131);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
`;

export const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-flow: column;
    align-items: center;
    gap: 40px;
  }
`;

export const Spiral = styled.div`
  position: absolute;
  top: 17px;
  left: 21%;
  width: 23%;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Spira2 = styled.div`
  position: absolute;
  top: 17px;
  right: 21%;
  width: 23%;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
