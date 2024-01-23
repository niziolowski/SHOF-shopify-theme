export default () => ({
  isMobileOpen: false,
  isSearchOpen: false,
  currentSubmenu: null,

  toggleSubmenu(menu) {
    // If the submenu is opened and user click on it again, go to category
    if (menu === this.currentSubmenu) return;

    // If the submenu is closed, prevent redirect and set submenu as current
    this.$event.preventDefault();
    this.currentSubmenu = menu;
  },

  // Mobile menu
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
