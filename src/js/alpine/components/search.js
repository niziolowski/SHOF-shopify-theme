export default () => {
  return {
    query: '',
    results: [],
    open: false,
    searchBody: false,
    searchTitle: true,
    filterAvailable: true,

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

      // Construct the fields parameter based on boolean variables
      let fields = [];
      if (this.searchBody) fields.push('body');
      if (this.searchTitle) fields.push('title');
      let fieldsParam = fields.length > 0 ? `&resources[options][fields]=${fields.join(',')}` : '';

      // Construct the availability parameter based on filterAvailable
      let availabilityParam = this.filterAvailable ? '&resources[options][unavailable_products]=hide' : '';

      const searchUrl = `search/suggest.json?q=${encodeURIComponent(
        this.query
      )}&resources[type]=product,collection,query${availabilityParam}${fieldsParam}`;

      fetch(window.Shopify.routes.root + searchUrl)
        .then((response) => response.json())
        .then((data) => {
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
