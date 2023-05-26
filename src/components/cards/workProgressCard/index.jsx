import React, { useState } from "react";
import WorkIcon from "../../../assets/icons/WorkIcon";
import { Container, ImageWrapper, ImageContainer, Text, Title } from "./styled";

const WorkProgressCard = ({ title, text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hovered={hovered}
    >
      <ImageContainer hovered={hovered}>
        <ImageWrapper>
          <WorkIcon hover={hovered} />
        </ImageWrapper>
      </ImageContainer>
      <Title hovered={hovered}>{title}</Title>
      <Text hovered={hovered}>{text}</Text>
    </Container>
  );
};

export default WorkProgressCard;
