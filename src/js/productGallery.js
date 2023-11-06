import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";

export const swiper = new Swiper(".mySwiper", {
  modules: [Navigation, Thumbs],
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

export const swiper2 = new Swiper(".mySwiper2", {
  modules: [Navigation, Thumbs],
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper,
  },
});
