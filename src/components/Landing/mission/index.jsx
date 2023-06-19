// import AnimatedElement from "@/components/Animate";
import React from "react";
import {
  pointerBottom,
  pointerMid,
  pointerTop,
  tree,
} from "../../../assets/images";
import PointerTemplate from "./PointerTemplate";
import {
  Body,
  Left,
  MissionContainer,
  pointerStyleLeft,
  pointerStyleRight,
  Right,
  TitleContainer,
  TreeImg,
} from "./styled";
import Title from "./Title";

const Mission = () => {
  return (
    <MissionContainer className="flex justify-center mb-8" id="our-mission">
      {/* <AnimatedElement animation="animate__heartBeat"> */}
      <Title />
      {/* </AnimatedElement> */}
      <Body>
        <Left>
          {/* <AnimatedElement animation="animate__fadeInTopLeft"> */}
          <PointerTemplate
            pointer={pointerTop}
            text="Plant Sciences"
            position="left"
            top={true}
          />
          {/* </AnimatedElement> */}
          {/* <AnimatedElement animation="animate__fadeInLeft"> */}
          <PointerTemplate
            pointer={pointerMid}
            text="Soil and Water"
            position="left"
            pointerStyle={pointerStyleLeft}
          />
          {/* </AnimatedElement> */}
          {/* <AnimatedElement animation="animate__fadeInBottomLeft"> */}
          <PointerTemplate
            pointer={pointerBottom}
            text="Post-harvest and Processing"
            position="left"
            bottom={true}
          />
          {/* </AnimatedElement> */}
        </Left>
        {/* <AnimatedElement animation="animate__zoomIn"> */}
        <TreeImg src={tree} alt="" />
        {/* </AnimatedElement> */}

        <Right>
          {/* <AnimatedElement animation="animate__fadeInTopRight"> */}
          <PointerTemplate
            pointer={pointerTop}
            text="Plant Protection"
            position="right"
            top={true}
          />
          {/* </AnimatedElement> */}

          {/* <AnimatedElement animation="animate__fadeInRight"> */}
          <PointerTemplate
            pointer={pointerMid}
            text="Animal Sciences"
            position="right"
            pointerStyle={pointerStyleRight}
          />
          {/* </AnimatedElement> */}

          {/* <AnimatedElement animation="animate__fadeInBottomRight"> */}
          <PointerTemplate
            pointer={pointerBottom}
            text="Agricultural Engineering"
            position="right"
            bottom={true}
          />
          {/* </AnimatedElement> */}
        </Right>
      </Body>
      {/* <img src={mission} alt="mission" /> */}
    </MissionContainer>
  );
};

export default Mission;
