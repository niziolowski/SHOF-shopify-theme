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

// Alpine directives
import tooltip from './directives/tooltip';
import reveal from './directives/reveal';

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
  Alpine.data('addToCartValidation', () => {
    return {
      quantity: 1,
      pasek: '',
      finish: '',
      message: '',
      pasekInitialized: false,
      finishInitialized: false,

      setMessage(message) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = message;
      },

      validate() {
        if (this.finish === 'initialized') return this.setMessage('Proszę wybrać wykończenie');
        if (this.pasek === 'initialized') return this.setMessage('Proszę wybrać pasek');

        this.setMessage('');
        Functions.addToCart(this.$refs.product_form);
      },

      initializeFinishAttribute(e) {
        this.finish = e.detail.finish;

        if (!this.finishInitialized) {
          // finish HTML
          const finish = `<input
        type="hidden"
        name="properties[Wykończenie]"
        x-model="finish" />`;

          // Get the form DOM element
          const form = this.$refs.product_form;
          // insert attributes to form
          form.insertAdjacentHTML('afterbegin', finish);
          this.finishInitialized = true;
        }
      },

      initializePasekAttribute(e) {
        this.pasek = e.detail.pasek;

        if (!this.pasekInitialized) {
          // pasek HTML
          const pasek = `<input
        type="hidden"
        name="properties[Pasek]"
        x-model="pasek" />`;

          // Get the form DOM element
          const form = this.$refs.product_form;
          // insert attributes to form
          form.insertAdjacentHTML('afterbegin', pasek);
          this.pasekInitialized = true;
        }
      },
    };
  });

  // Alpine directives
  Alpine.directive('tooltip', tooltip);
  Alpine.directive('reveal', reveal);

  window.Alpine = Alpine;
});

Alpine.start();
