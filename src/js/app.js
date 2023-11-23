import 'swiper/css';
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';

import { swiper, swiper2 } from './productGallery';

// Alpine components
import header from './header';
import slider from './slider';
import imageWithTitle from './imageWithTitle';
import filters from './filters';
import accordion from './accordion';
import cart from './cart';
import tooltip from './tooltip';
import search from './search';

// Alpine plugins
Alpine.plugin(collapse);
Alpine.plugin(focus);
Alpine.plugin(intersect);

// Alpine data
Alpine.data('header', header);
Alpine.data('slider', slider);
Alpine.data('imageWithTitle', imageWithTitle);
Alpine.data('filters', filters);
Alpine.data('accordion', accordion);
Alpine.data('cart', cart);
Alpine.data('search', search);

// Product gallery global object (for slide manipulation)
window.swiper = swiper2;

window.Alpine = Alpine;

// Alpine directives
Alpine.directive('tooltip', tooltip);

Alpine.start();
