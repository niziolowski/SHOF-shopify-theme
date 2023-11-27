export default () => {
  return {
    recommendations: [],
    async fetchRecommendations(productId, limit = 10, intent = 'complementary') {
      const recommendationsUrl = `/recommendations/products.json?product_id=${productId}&limit=${limit}&intent=${intent}`;

      try {
        const response = await fetch(recommendationsUrl);
        const data = await response.json();
        this.recommendations = data.products;
        console.log(this.recommendations);
      } catch (error) {
        console.error(error);
      }
    },
  };
};
