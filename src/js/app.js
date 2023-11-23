import { swiper, swiper2 } from './alpine/components/productGallery.js'; // Swiper instance for product gallery

import instaFeed from './instaFeed.js'; // A function for adding reveal effect to InstaFeed third-party widget
import './alpine/alpine.js'; // AlpineJS setup
// Product gallery global object (for slide manipulation)
window.swiper = swiper2;

window.addEventListener('load', () => {
  instaFeed();
});
