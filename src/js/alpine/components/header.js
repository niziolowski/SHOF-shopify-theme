export default () => ({
  isMobileOpen: false,
  isSearchOpen: false,

  toggleMenu() {
    this.isMobileOpen = !this.isMobileOpen;
    if (this.isMobileOpen) {
      document.body.style.overflow = 'hidden'; // Lock body scroll
    } else {
      document.body.style.overflow = ''; // Restore body scroll
    }
  },

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      document.body.style.overflow = 'hidden'; // Lock body scroll
    } else {
      document.body.style.overflow = ''; // Restore body scroll
    }
  },
});
