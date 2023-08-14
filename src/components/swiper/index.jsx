import React, { useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Navigation, Pagination } from "swiper/modules";

const CMSwiper = ({ children, ...props }) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      modules: [Navigation, Pagination],
      // And if we need scrollbar
      // scrollbar: {
      //   el: ".swiper-scrollbar",
      // },
      scrollbar: false,
    });
  }, []);

  return (
    <div className="swiper">
      {/* <!-- Additional required wrapper --> */}
      <div className="swiper-wrapper">
        {/* <!-- Slides --> */}
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
        ...
      </div>
      {/* <!-- If we need pagination --> */}
      <div className="swiper-pagination"></div>

      {/* <!-- If we need navigation buttons --> */}
      {/* <div className="swiper-button-prev">Prev</div>
      <div className="swiper-button-next">Next</div> */}

      {/* <!-- If we need scrollbar --> */}
      <div className="swiper-scrollbar"></div>
    </div>
  );
};

export default CMSwiper;

// <Swiper
//   autoHeight={true}
//   spaceBetween={20}
//   navigation={{
//     nextText: "Next slide message",
//   }}
//   pagination={{
//     clickable: true,
//   }}
//   modules={[Navigation, Pagination]}
//   className="mySwiper "
//   nextSlideMessage="Next slide message"
//   {...props}
// >
//   {children}
// </Swiper>
