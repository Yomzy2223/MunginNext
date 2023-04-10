import Image from "next/image";
import React from "react";
import { receiptDiscount } from "../../../assets/icons";
import { IconWrapper, Pointer, PointerContainer, PointerImage } from "./styled";

const PointerTemplate = ({
  pointer,
  position,
  bottom,
  top,
  text,
  pointerStyle,
}) => {
  return (
    <PointerContainer position={position}>
      {position === "left" && <span position={position}>{text}</span>}
      <Pointer>
        {position === "right" && (
          <PointerImage
            src={pointer}
            alt=""
            $bottom={bottom}
            $top={top}
            style={pointerStyle}
          />
        )}
        <IconWrapper>
          <Image src={receiptDiscount} alt="" />
        </IconWrapper>
        {position === "left" && (
          <PointerImage
            src={pointer}
            alt=""
            $left
            $bottom={bottom}
            $top={top}
            style={pointerStyle}
          />
        )}
      </Pointer>
      {position === "right" && <span position={position}>{text}</span>}
    </PointerContainer>
  );
};

export default PointerTemplate;
