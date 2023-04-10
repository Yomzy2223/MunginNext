import Image from "next/image";
import React from "react";
import { leaf } from "../../../assets/images";
import { TitleContainer } from "./styled";

const Title = () => {
  return (
    <TitleContainer>
      <div>
        <Image src={leaf} alt="" />
        <p>Our mission</p>
      </div>

      <p>
        To generate and provide data and insight to facilitate innovation in
        Nigeria's Agricultural sectior.
      </p>
    </TitleContainer>
  );
};

export default Title;
