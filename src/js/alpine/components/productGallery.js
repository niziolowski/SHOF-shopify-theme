// Swiper imports
import 'swiper/css';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

export default () => {
  return {
    productMedia: undefined,
    modalOpen: false,
    imageUrl: null,
    initialize(productMedia) {
      this.productMedia = productMedia;

      const swiper = new Swiper('.mySwiper', {
        modules: [Navigation, Thumbs],
        loop: false,
        spaceBetween: 20,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
      });

      if (productMedia.length < 2) return;

      const swiper2 = new Swiper('.mySwiper2', {
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

      // Product gallery global object (for slide manipulation)
      window.swiper = swiper2;
    },

    handleClick(mediaId) {
      // Find corresponding image url
      const imageUrl = this.productMedia.find((media) => media.id == mediaId).src;

      this.imageUrl = imageUrl;
      this.toggleModal();
    },

    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
  };
};
