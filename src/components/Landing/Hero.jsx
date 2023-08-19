import React from "react";
import green from "../../assets/images/Union.png";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import AnimatedElement from "../Animate";

const Hero = () => {
  return (
    // parent container
    <Container>
      {/* left container */}
      <Left>
        <AnimatedElement animation="animate__fadeIn">
          <h1>
            Growing <span style={{ color: "#83BF4F" }}>Agricultural</span> Data For immediate Impact
          </h1>
        </AnimatedElement>
        <AnimatedElement animation="animate__fadeIn">
          <p className="mt-7 text-[#565656]">
            We transform data to actionable insights that power decision making across the
            agricultural value chain. Delivering innovative Agtech Solutions to improve agricultural
            productivity in Nigeria is our ethos.{" "}
          </p>
        </AnimatedElement>
        {/* button and link */}
        <AnimatedElement animation="animate__fadeIn">
          <Buttons>
            <Link href={"/database"}>
              <HeroButton>Search Our Database</HeroButton>
            </Link>
            <Link href={"/auth/signup/farmer"}>
              <button style={JoinButtonStyles}>Join Us</button>
            </Link>
          </Buttons>
        </AnimatedElement>
      </Left>

      {/* right container */}
      <AnimatedElement animation="animate__fadeIn">
        <Right>
          <Image src={green} alt="right" />
        </Right>
      </AnimatedElement>
    </Container>
  );
};

export default Hero;

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: #565656;

  @media screen and (max-width: 600px) {
    flex-flow: column;
    align-items: stretch;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 12px;
  width: 50%;

  h1 {
    font-size: clamp(28px, 3vw, 36px);
    font-weight: 700;
    color: #313131;
    font-family: "Raleway", sans-serif;

    span {
      font-size: clamp(25px, 2.7vw, 30px);
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;

    h1,
    p {
      margin-block: 24px;
      text-align: center;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  gap: 16px;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

export const HeroButton = styled.button`
  display: flex;
  background-color: #17233c;
  padding: 12px 16px;
  color: #ffffff;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  font-family: "Noto Sans Batak";
`;

export const Right = styled.div`
  margin: 24px 0 32px;
  padding: 40px 0 0;

  animation: bounce;
  animation-duration: 2s;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const JoinButtonStyles = {
  backgroundColor: "transparent",
  border: "none",
  color: "#375A1A",
  fontSize: "clamp(14px, 1.5vw, 16px",
};
