import { Navigation, Pagination } from "swiper/modules";
import Swiper from "swiper";

export const createNewSwiper = () => {
  return new Swiper(".swiper", {
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
};
