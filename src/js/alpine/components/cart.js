export default (giftWrapProductID) => {
  return {
    loading: false,
    giftWrap: false,
    giftWrapProductID: giftWrapProductID,

    init() {
      // update the checkbox state based on the presence of the gift wrap in the cart
      this.checkGiftWrapInCart();
    },

    handleSubmit(e) {
      // Get form element
      const form = this.$refs.form;
      // Get form data
      const formData = new FormData(form);

      this.$dispatch('form-submit', formData);
    },

    updateCart() {
      // send fetch reqeust to update cart
      fetch('/?view=ajax-cart-page')
        .then((response) => response.text())
        .then((cartData) => {
          this.$refs.cart_content.innerHTML = cartData;
          // This code is use to parse json object. for cart count
          var el = document.createElement('div');
          el.innerHTML = cartData;
          var cartCount = JSON.parse(el.querySelector('[data-options]').innerHTML).item_count;
          this.$dispatch('cart-count-updated', cartCount);
          this.loading = false;
        });
      this.checkGiftWrapInCart();
    },

    checkGiftWrapInCart() {
      fetch('/cart.js')
        .then((response) => response.json())
        .then((cart) => {
          // Check if the gift wrap product is in the cart
          const giftWrapItem = cart.items.find((item) => item.id === this.giftWrapProductID);
          this.giftWrap = !!giftWrapItem; // Set the checkbox state based on the presence of the gift wrap
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    updateGiftWrap() {
      if (this.giftWrap) {
        this.addGiftWrap();
      } else {
        this.removeGiftWrap();
      }
    },

    addGiftWrap() {
      // Add the gift wrap product to the cart
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: this.giftWrapProductID, quantity: 1 }],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          window.dispatchEvent(new CustomEvent('update-cart'));
        })
        .catch((error) => {
          console.error('Error:', error);
          window.dispatchEvent(new CustomEvent('update-cart'));
        });
    },

    removeGiftWrap() {
      fetch('/cart.js')
        .then((response) => response.json())
        .then((cart) => {
          // Find the gift wrap item in the cart
          const giftWrapItem = cart.items.find((item) => item.id === this.giftWrapProductID);
          if (giftWrapItem) {
            // If the gift wrap is found in the cart, set its quantity to 0
            return fetch('/cart/change.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: giftWrapItem.key, // Use the unique key of the line item
                quantity: 0,
              }),
            });
          } else {
            // If the gift wrap is not found, no action is needed
            return Promise.resolve();
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((cart) => {
          // Refresh cart logic here (if needed)
          window.dispatchEvent(new CustomEvent('update-cart'));
        })
        .catch((error) => {
          console.error('Error:', error);
          window.dispatchEvent(new CustomEvent('update-cart'));
        });
    },
  };
};
