// Core Alpine and plugins
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';

// Alpine components
import header from './components/header';
import slider from './components/slider';
import imageWithTitle from './components/imageWithTitle';
import filters from './components/filters';
import accordion from './components/accordion';
import cart from './components/cart';
import search from './components/search';
import customAttributes from './components/customAttributes';
import relatedProducts from './components/relatedProducts';
import complementaryPrducts from './components/complementaryProducts';
import relatedCollection from './components/relatedCollection';
import stripesCollection from './components/stripesCollection';
import inpost from './components/inpost';

// Alpine directives
import tooltip from './directives/tooltip';
import reveal from './directives/reveal';
import addToCartValidation from './components/addToCartValidation';

document.addEventListener('alpine:init', () => {
  // Alpine plugin setup
  Alpine.plugin(collapse);
  Alpine.plugin(focus);
  Alpine.plugin(intersect);

  // Alpine data setup
  Alpine.data('header', header);
  Alpine.data('slider', slider);
  Alpine.data('imageWithTitle', imageWithTitle);
  Alpine.data('filters', filters);
  Alpine.data('accordion', accordion);
  Alpine.data('cart', cart);
  Alpine.data('search', search);
  Alpine.data('customAttributes', customAttributes);
  Alpine.data('relatedProducts', relatedProducts);
  Alpine.data('complementaryProducts', complementaryPrducts);
  Alpine.data('relatedCollection', relatedCollection);
  Alpine.data('stripesCollection', stripesCollection);
  Alpine.data('addToCartValidation', addToCartValidation);
  Alpine.data('inpost', inpost);

  // Alpine directives
  Alpine.directive('tooltip', tooltip);
  Alpine.directive('reveal', reveal);

  window.Alpine = Alpine;
});

Alpine.start();
