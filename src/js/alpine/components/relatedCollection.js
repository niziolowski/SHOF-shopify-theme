import 'swiper/css';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

export default () => {
  return {
    products: [],

    async initialize(productId) {
      if (!productId) return;

      const globalId = `gid://shopify/Product/${productId}`;
      // Fetch current product's complementary products IDs
      const collection = await this.fetchProductCollection(globalId);

      if (!collection) return;
      // Filter out current product
      const filteredCollection = collection.filter((product) => product.id !== globalId && product.availableForSale);

      this.products = filteredCollection;

      this.$nextTick(() => {
        this.swiper = new Swiper('#related-collection-swiper', {
          modules: [Navigation, Thumbs],
          loop: false,
          spaceBetween: 20,
          slidesPerView: 2,
          freeMode: true,
          watchSlidesProgress: true,
          breakpoints: {
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          },
          navigation: {
            nextEl: '#related-collection-btn-next',
            prevEl: '#related-collection-btn-prev',
          },
          on: {
            slideChangeTransitionEnd: function () {
              toggleNavigationButtons.call(this);
            },
            reachEnd: function () {
              toggleNavigationButtons.call(this);
            },
            reachBeginning: function () {
              toggleNavigationButtons.call(this);
            },
            breakpoint: function () {
              toggleNavigationButtons.call(this);
            },
          },
        });

        function toggleNavigationButtons() {
          var firstVisibleIndex = this.activeIndex === 0;
          var lastVisibleIndex = this.activeIndex + this.params.slidesPerView - 1;

          const prevEl = document.querySelector('#related-collection-btn-prev');
          const nextEl = document.querySelector('#related-collection-btn-next');
          // Toggle visibility of both navigation buttons based on the current slide
          if (firstVisibleIndex || this.slides.length < this.params.slidesPerView) {
            prevEl.style.display = 'none';
          } else {
            prevEl.style.display = 'block';
          }

          if (lastVisibleIndex === this.slides.length - 1 || this.slides.length < this.params.slidesPerView) {
            nextEl.style.display = 'none';
          } else {
            nextEl.style.display = 'block';
          }
        }

        // Toggle navigaion buttons on load
        toggleNavigationButtons.call(this.swiper);
      });
    },

    getImageSrcWithSize(originalSrc, size) {
      if (!originalSrc || !size) return originalSrc; // Return the original source if no size is provided

      // Extract the file extension from the original source
      const extensionIndex = originalSrc.lastIndexOf('.');
      if (extensionIndex === -1) return originalSrc; // Return original source if no extension found

      const pathWithoutExtension = originalSrc.substring(0, extensionIndex);
      const extension = originalSrc.substring(extensionIndex);

      // Return the new image source with the specified size
      return `${pathWithoutExtension}_${size}${extension}`;
    },

    async fetchProductCollection(id) {
      const query = `{
        product(id: "${id}") {
          metafield(key: "reszta_kolekcji", namespace: "custom") {
            reference {
              ... on Collection {
                id
                products(first: 250) {
                  nodes {
                   id
                  title
                  handle
                  availableForSale
                  onlineStoreUrl
                  featuredImage {
                    altText
                    id
                    url(transform: {maxHeight: 500, maxWidth: 600})
                  }
                  images(first: 2) {
                    nodes {
                      id
                      url(transform: {maxWidth: 500, maxHeight: 600})
                      altText
                    }
                  }
                  variants(first: 250) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                    maxVariantPrice {
                      amount
                    }
                  }
                  compareAtPriceRange {
                    maxVariantPrice {
                      amount
                    }
                  }
                  metafields(
                    identifiers: [{key: "tag", namespace: "custom"}, {key: "tag_2", namespace: "custom"}]
                  ) {
                    id
                    reference {
                      ... on Metaobject {
                        id
                        fields {
                          key
                          value
                        }
                      }
                    }
                    key
                  }
                  }
                }
              }
            }
          }
        }
      }`;
      const data = await this.fetch(query);
      return data?.product?.metafield?.reference?.products?.nodes;
    },

    // Function to find the selected or first available variant
    findFirstAvailableVariant(variants) {
      // Find the first available variant
      let selectedVariant = variants.find((variant) => variant.node.availableForSale);

      return selectedVariant ? selectedVariant.node.id : null;
    },

    // Check if product price varies
    priceVaries(product) {
      return product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount;
    },

    async fetch(query) {
      try {
        const response = await fetch('https://shof-dev.myshopify.com/api/2023-10/graphql.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '0dc2507ca5800d743e5546faaf2654fe',
          },
          body: JSON.stringify({ query }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          console.error('Error fetching products:', errors);
          return;
        }

        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  };
};
