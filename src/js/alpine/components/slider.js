// Reviews section
export default () => ({
  // Slide with the biggest height value
  maxSlideIndex: 0,
  totalSlides: 3,

  initialize() {
    // Start playing
    this.resetInterval();
    // Get sliderContainer
    const sliderContainer = this.$refs.sliderContainer;
    // Get slide nodes
    const slides = Array.from(sliderContainer.children);
    this.totalSlides = slides.length;

    // Find the highest slide and save it's index for reference
    const biggestSlide = slides.reduce(
      (acc, cur, i) => {
        if (cur.clientHeight > acc.height) {
          return { height: cur.clientHeight, index: i + 1 };
        } else {
          return acc;
        }
      },
      { height: 0, index: 0 }
    );

    this.maxSlideIndex = biggestSlide.index;

    // Adjust the slider height
    this.adjustContainerHeight();
    // Add event user windows resizing
    window.addEventListener('resize', () => this.adjustContainerHeight());
  },

  adjustContainerHeight() {
    // Get slider container
    const sliderContainer = this.$refs.sliderContainer;
    // Get height from the biggest slide
    const maxSlideHeight = this.$refs[`slide-${this.maxSlideIndex}`].clientHeight;
    // Adjust container height
    sliderContainer.style.height = `${maxSlideHeight}px`;

    // Adjust other slides height
    for (let i = 1; i <= this.totalSlides; i++) {
      if (i != this.maxSlideIndex) {
        const slide = this.$refs[`slide-${i}`];
        slide.style.height = `${maxSlideHeight}px`;
      }
    }
  },

  currentIndex: 1, // start index is 1, not 0.

  slideInit() {
    for (let i = 1; i <= this.totalSlides; i++) {
      if (i != this.currentIndex) {
        const slide = this.$refs[`slide-${i}`];
        slide.classList.add('hide');
      }
    }
  },

  /** Sets alpine.js attributes with transition classes according to the direction parameter
   *
   * @param {String} direction
   *
   */
  transition(direction, nextIndex) {
    // Upate attributes for all slides
    const previousSlide = this.$refs[`slide-${this.currentIndex}`];
    const nextSlide = this.$refs[`slide-${nextIndex}`];

    nextSlide.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'hide');
    void nextSlide.offsetWidth; // Reset animation
    nextSlide.classList.add(`slide-in-${direction}`);

    previousSlide.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'hide');
    void previousSlide.offsetWidth; // Reset animation
    previousSlide.classList.add(`slide-out-${direction}`);
  },

  startInterval() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  },

  resetInterval() {
    clearInterval(this.interval);
    this.startInterval();
  },

  destroy() {
    // Detach the handler, avoiding memory and side-effect leakage
    clearInterval(this.interval);
  },

  nextSlide() {
    this.resetInterval();
    let index = (this.currentIndex % this.totalSlides) + 1;
    this.transition('right', index);
    this.currentIndex = index;
  },
  previousSlide() {
    this.resetInterval();
    let index = ((this.currentIndex - 2 + this.totalSlides) % this.totalSlides) + 1;
    this.transition('left', index);
    this.currentIndex = index;
  },
  goToSlide(index) {
    this.resetInterval();
    if (index > this.currentIndex) {
      this.transition('right', index);
      this.currentIndex = index;
    }
    if (index < this.currentIndex) {
      this.transition('left', index);
      this.currentIndex = index;
    }
  },
});
