import { Navigation, Pagination } from "swiper/modules";
import Swiper from "swiper";
import {
  individualSchema,
  institutionSchema,
  investorSchema,
  serviceProviderSchema,
} from "./constants";

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

export const getSignUpSchema = (user) => {
  if (user === "institution") return institutionSchema;
  else if (user === "investor") return investorSchema;
  else if (user === "service-provider") return serviceProviderSchema;
  else if (user === "individual") return individualSchema;
  else return false;
};
