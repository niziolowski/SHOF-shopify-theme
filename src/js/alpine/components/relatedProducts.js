export default () => {
  return {
    products: [],

    async init() {
      // Fetch current product's related products IDs
      const relatedProductsIds = await this.fetchRelatedProductsIds();
      if (!relatedProductsIds) return;

      // Fetch related products
      const relatedProducts = await this.fetchRelatedProducts(relatedProductsIds);

      this.products = relatedProducts;
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

    async fetchRelatedProducts(ids) {
      const query = `{
        nodes(ids: ${ids}) {
          ... on Product {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              originalSrc
              altText
            }
          }
        }
      }`;

      const data = await this.fetch(query);
      return data.nodes;
    },

    async fetchRelatedProductsIds() {
      const query = `{
        product(id: "gid://shopify/Product/9448658993455") {
          
          metafield(key: "related_products", namespace: "shopify--discovery--product_recommendation") {
            value
          }
        }
      }`;
      const data = await this.fetch(query);
      return data.product.metafield.value;
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
