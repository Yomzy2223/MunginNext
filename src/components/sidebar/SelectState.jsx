import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { nigeriaStates } from "./constants";

const SelectState = () => {
  const router = useRouter();

  const handleClick = (state) => {
    console.log(state);
    router.push({
      query: {
        state: state.shortName,
      },
    });
  };

  return (
    <SelectStateWrapper>
      <Title>Select a State</Title>

      <AllStates>
        {nigeriaStates.map((state, i) => (
          <EachState key={i} onClick={() => handleClick(state)}>
            <Short>{state.shortName}</Short>
            <FullName>{state.name}</FullName>
          </EachState>
        ))}
      </AllStates>
    </SelectStateWrapper>
  );
};

export default SelectState;

export const Title = styled.div`
  padding: 24px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #eee;
`;

export const SelectStateWrapper = styled.div``;

export const AllStates = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  flex-flow: row wrap;
  gap: 32px;
  padding: 0 24px 24px;
  max-height: 100vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-left: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background: #00853e;
    border-radius: 0;
  }
`;

export const EachState = styled.div`
  cursor: pointer;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 130px;
  width: 100%;

  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dffff0;
  box-shadow: 5px 0 5px #e5e5e5;
  transition: 0.3s ease all;

  :hover {
    opacity: 0.9;
  }
  :focus {
    opacity: 0.8;
  }
  :active {
    opacity: 0.8;
    scale: 0.9;
  }
`;

export const FullName = styled.p`
  text-align: center;
`;

export const Short = styled.p`
  padding: 16px;
  border-radius: 50%;
  font-size: 20px;
  background-color: #dffff0;
  color: #00853e;
  font-weight: 700;
  font-size: 18px;
`;
