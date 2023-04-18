import React from "react";
import { IoWater } from "react-icons/io5";

const WaterReqIcon = ({ active }) => {
  return <IoWater color={active ? " #778761" : "#EEEEEE"} />;
};

export default WaterReqIcon;
