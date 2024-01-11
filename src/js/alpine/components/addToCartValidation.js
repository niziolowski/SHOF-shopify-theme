export default () => {
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
};
