export const Container = styled.div`
  display: flex;
`;

export const LeftContainer = styled.div`
  width: 50%;

  img {
    height: 100%;
    object-fit: cover;
    min-height: 100vh;
    max-width: 100%;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%;
  padding-inline: clamp(20px, 3vw, 32px);

  input,
  button,
  select {
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    background-image: url("../../assets/cocoa.png");
    background: image(cocoa);
  }
`;

export const HomeLink = styled(Link)`
  margin-top: 24px;
`;

export const Form = styled.form`
  color: #313131;
`;

export const Title = styled.h2`
  margin-block: clamp(50px, 5vw, 80px) 24px;
  font-size: clamp(20px, 2.5vw, 30px);
  font-weight: 600;
`;

import styled from "styled-components";
import Link from "next/link";

export const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;

export const FieldLabel = styled.div`
  margin-bottom: 8px;
`;

export const FieldInput = styled.input`
  display: flex;
  padding: 12px 16px;
  border: 1px solid #00000011;
  font-size: clamp(14px, 1.4vw, 16px);

  ::placeholder {
    font-size: clamp(14px, 1.4vw, 16px);
    opacity: 0.5;
  }
`;

export const SubmitButton = styled.button`
  padding: 24px 8px;
  background-color: #17233c;
  color: #fff;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 600;
`;

export const Bottom = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  margin-bottom: 48px;

  a {
    text-decoration: none;
  }
`;

export const BottomLinkText = styled.p`
  color: #888888;

  span {
    color: #333333;
  }
`;
