import Image from "next/image";
import React from "react";
import advert from "../../assets/sponsors.png";

const Advert = () => {
  return (
    <div className="flex justify-center mt-24 mb-20 ">
      <Image width={1200} height={500} src={advert} alt="advert" />
    </div>
  );
};

export default Advert;
