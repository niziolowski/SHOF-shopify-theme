export default () => {
  return {
    query: '',
    results: [],
    open: false,

    init() {
      // Focus search input when opened (without watch and setTimeout its inconsistent)
      this.$watch('isSearchOpen', (value) => {
        if (value) {
          setTimeout(() => {
            this.$refs.searchInput.focus();
          }, 100);
        }
      });

      // Auto search for testing
      // this.$nextTick(() => {
      //   this.query = '';
      //   this.search();
      // });
    },

    search() {
      if (this.query.length < 1) {
        this.results = [];
        this.open = false;
        return;
      }
      this.open = true;
      const searchUrl = `search/suggest.json?q=${encodeURIComponent(
        this.query
      )}&resources[type]=product,collection,query&resources[options][unavailable_products]=hide&resources[options][fields]=tag`;

      fetch(window.Shopify.routes.root + searchUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.resources.results.products.length);
          this.results = data.resources.results.products || [];
        })
        .catch((error) => {
          console.error('Error:', error);
          this.results = [];
        });
    },
    reset() {
      this.query = '';
      this.results = [];
      this.open = false;
    },
  };
};
