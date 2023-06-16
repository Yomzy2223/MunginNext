import React from "react";
import { BsArrowRight } from "react-icons/bs";
import carousel from "../../assets/carousel-image.png";
import { data } from "./CardData";
const CardContainer = ({ item }) => {
  return data.map((item) => {
    return (
      <div
        className="bg-[#FAFAFA] rounded-md flex flex-col w-1/2 sm:w-full"
        key={item.id}
      >
        <img src={item.url} className="w-full" alt="carousel-img" />
        <p className="pl-10 mt-4 text-sm text-[#83BF4F]">{item.date}</p>
        <h3 className="pl-10 mt-2 text-xl font-semibold">{item.topic}</h3>
        <p className="pl-10 mt-2 text-[#7D7D7D]">{item.content}</p>
        <button></button>
        <p className="pl-10 mt-6 text-[#83BF4F] font-bold ">
          {item.read}{" "}
          <span className="absolute pt-1 ml-3">
            <button>
              <BsArrowRight size={20} />
            </button>
          </span>
        </p>
      </div>
    );
  });
};

export default CardContainer;
