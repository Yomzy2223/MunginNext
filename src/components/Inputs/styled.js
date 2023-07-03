import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 5px;
  height: max-content;
`;

export const InputWrapper = styled.div``;

export const Tags = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  width: max-content;
  max-width: 160px;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
    background-color: #e7ffd6;
  }
`;

export const Options = styled.ul`
  position: absolute;
  top: 15px;
  left: 0;
  list-style: none;
  background-color: #fff;
  padding: 0 0 10px;
  width: 100%;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 10px 15px #00000011;
`;

export const EachOption = styled.li`
  cursor: pointer;
  margin: 0;
  padding: 10px;
  height: max-content;
  line-height: 18px;

  :hover {
    background-color: #eee;
  }
`;
