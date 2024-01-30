export default (hasSingleVariant, defaultVariantId) => {
  return {
    quantity: 1,
    pasek: '',
    finish: '',
    message: '',
    variant: '',
    pasekInitialized: false,
    finishInitialized: false,
    hasSingleVariant: hasSingleVariant === 'true' ? true : false,

    setMessage(message) {
      const messageEl = document.getElementById('message');
      messageEl.textContent = message;
    },

    validate() {
      // If product has multiple variants, validate variant input
      if (!this.hasSingleVariant) {
        // get variant input
        const variant = this.$refs.variant;

        if (variant && this.$refs.variant.value.length === 0) return this.setMessage('Proszę wybrać wykończenie');
      }

      console.log(this.hasSingleVariant, this.variant);

      // If product has single variant, set default variant
      if (this.hasSingleVariant) this.variant = +defaultVariantId;

      if (this.finish === 'initialized') return this.setMessage('Proszę wybrać wykończenie');
      if (this.pasek === 'initialized') return this.setMessage('Proszę wybrać pasek');

      // If vaild, add to cart
      this.setMessage('');
      this.$nextTick(() => Functions.addToCart(this.$refs.product_form));
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
};
