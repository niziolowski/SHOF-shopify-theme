import 'swiper/css';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

export const swiper = new Swiper('.mySwiper', {
  modules: [Navigation, Thumbs],
  loop: false,
  spaceBetween: 20,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
});

export const swiper2 = new Swiper('.mySwiper2', {
  modules: [Navigation, Thumbs],
  loop: true,
  spaceBetween: 20,
  thumbs: {
    swiper: swiper,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
