import React from "react";
import styled from "styled-components";
import ArticlesCard from "../cards/ArticlesCard";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Articles = () => {
  return (
    <Container id="news-articles">
      <Top>
        <Title>Latest News & Articles</Title>
        {/* <Text>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            eligendi saepe, quas tempora quam ullam!
          </p>
          <Buttons>
            <button>
              <AiOutlineArrowLeft size={15} color="#83bf4f" />
            </button>
            <button></button>
          </Buttons>
        </Text> */}
      </Top>
      <Main>
        <ArticlesCard
          date="23 july 2021"
          title="Crop Launching in Nigeria"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis numquam, facilis incidunt praesentium iusto cupiditate."
        />
        <ArticlesCard
          date="23 july 2021"
          title="Crop Launching in Nigeria"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis numquam, facilis incidunt praesentium iusto cupiditate."
        />
        <ArticlesCard
          date="23 july 2021"
          title="Crop Launching in Nigeria"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis numquam, facilis incidunt praesentium iusto cupiditate."
        />
      </Main>
    </Container>
  );
};

export default Articles;

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 27px;
  width: 100%;
  padding-top: 30px;
`;

export const Top = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  font-family: "Raleway";
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: clamp(20px, 2vw, 24px);
  line-height: 28px;
  text-transform: capitalize;
  color: #0a0a0a;
`;

export const Text = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  font-size: clamp(10px, 1vw, 13px);
  line-height: 20px;
  color: #7d7d7d;

  P {
    max-width: 492px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 16px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 2px solid #83bf4f;
    border-radius: 6px;

    :nth-of-type(2) {
      background-color: #83bf4f;
    }
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  @media screen and (max-width: 900px) {
    align-items: center;
    flex-flow: column;
    gap: 35px;
  }
`;
