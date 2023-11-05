export default () => ({
  initialize(titleSize) {
    this.titleSize = titleSize;
    this.adjustTitleSize();
    window.addEventListener("resize", () => this.adjustTitleSize());
  },
  adjustTitleSize() {
    // Get container height
    const height = this.$refs.image.clientHeight;

    // Get title element
    const title = this.$refs.title;
    // Calculate title size
    const newTitleSize = `${height * (this.titleSize / 100)}px`;
    // Apply new title size
    title.style.fontSize = newTitleSize;
  },
});
