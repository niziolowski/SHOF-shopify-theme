import 'swiper/css';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

export default () => {
  return {
    products: [],

    async initialize(productId) {
      if (!productId) return;
      // Fetch current product's complementary products IDs
      const complementaryProductsIds = await this.fetchComplementaryProductsIds(productId);

      if (!complementaryProductsIds) return;
      // Fetch complementary products
      const complementaryProducts = await this.fetchComplementaryProducts(complementaryProductsIds);
      this.products = complementaryProducts;

      this.$nextTick(() => {
        this.swiper = new Swiper('.complementary-products-swiper', {
          modules: [Navigation, Thumbs],
          loop: true,
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
        });
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

    async fetchComplementaryProducts(ids) {
      const query = `query MyQuery {
        nodes(ids: ${ids}) {
          ... on Product {
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
      }`;

      const data = await this.fetch(query);
      return data.nodes;
    },

    async fetchComplementaryProductsIds(id) {
      const query = `{
        product(id: "gid://shopify/Product/${id}") {
          
          metafield(key: "complementary_products", namespace: "shopify--discovery--product_recommendation") {
            value
          }
        }
      }`;
      const data = await this.fetch(query);
      return data.product?.metafield?.value;
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
