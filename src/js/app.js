import "swiper/css";
import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";

import { swiper, swiper2 } from "./productGallery";
import mobileMenu from "./mobileMenu";
import slider from "./slider";
import imageWithTitle from "./imageWithTitle";
import filters from "./filters";

Alpine.plugin(collapse);

Alpine.data("mobileMenu", mobileMenu);
Alpine.data("slider", slider);
Alpine.data("imageWithTitle", imageWithTitle);
Alpine.data("filters", filters);

// Product gallery global object
window.swiper = swiper2;

window.Alpine = Alpine;

Alpine.start();
