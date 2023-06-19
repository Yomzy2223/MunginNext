import React from "react";
import WorkProgressCard from "../../cards/workProgressCard";
import Wave1 from "../../../assets/icons/Wave1.svg";
import Wave2 from "../../../assets/icons/Wave2.svg";
import { Container, Main, Spira2, Spiral, Top } from "./styled";
import AnimatedElement from "@/components/Animate";
import Image from "next/image";

const WorkProgress = () => {
  return (
    <Container id="work-progress">
      <AnimatedElement animation="animate__fadeIn">
        <Top>
          <p>THE NEEDS OF TOMORROW</p>
          <p>Delivered Today</p>
        </Top>
      </AnimatedElement>
      <Main>
        <AnimatedElement animation="animate__fadeIn">
          <WorkProgressCard
            title="Unlock Data"
            text="Combining an uncompromising engineering mindset with an unwavering focus on data sourcing and aggregation making ready data that meets the highest level of integrity and reliability available for analysis."
          />
        </AnimatedElement>
        <AnimatedElement animation="animate__fadeIn">
          <Spiral>
            <Image src={Wave1} alt="" />
          </Spiral>
        </AnimatedElement>
        <AnimatedElement animation="animate__fadeIn">
          <WorkProgressCard
            title="Activate Analysis"
            text="Leveraging advanced analytics we sift through chaotic data into one comprehensive and flexible structure, creating personalized real-time dashboards that make managing agricultural business insights easier."
          />
        </AnimatedElement>
        <AnimatedElement animation="animate__fadeIn">
          <Spira2>
            <Image src={Wave2} alt="" />
          </Spira2>
        </AnimatedElement>
        <AnimatedElement animation="animate__fadeIn">
          <WorkProgressCard
            title="Accelerate Value"
            text="By providing insights-as-a-service: Actionable agricultural and business insights out of data. With good data and the right technology, people and institutions in Nigeria today will be able to solve the hard problems and change the country for the better."
          />
        </AnimatedElement>
      </Main>
    </Container>
  );
};

export default WorkProgress;
