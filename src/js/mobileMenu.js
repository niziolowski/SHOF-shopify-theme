export default () => ({
  isOpen: false,
  toggleMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      document.body.style.overflow = "hidden"; // Lock body scroll
    } else {
      document.body.style.overflow = ""; // Restore body scroll
    }
  },
});
