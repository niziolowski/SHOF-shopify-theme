export default () => ({
  sortOptions: [
    {
      value: "date-ascending",
      label: "Od najnowszych",
    },
    { value: "price-ascending", label: "Od najtańszych" },
    {
      value: "price-descending",
      label: "Od najdroszych",
    },
  ],
  colorOptions: [
    {
      value: "beze-i-brazy",
      label: "beże i brązy",
    },
    {
      value: "kolorowe",
      label: "kolorowe",
    },
    {
      value: "szarosci-i-czernie",
      label: "szarości i czernie",
    },
  ],
  materialOptions: [
    {
      value: "gladki",
      label: "gładki",
    },
    {
      value: "zamsz",
      label: "zamsz",
    },
    {
      value: "polysk",
      label: "połysk",
    },
  ],
  // Format for alpine.js

  isOpen: false,
  selectedSortOption: null,
  selectedColorOption: null,
  selectedMaterialOption: null,
  isLastOne: false,
  isPreOrder: false,
  isAvailable: false,

  init() {
    this.getFilterData();
  },

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    this.setFilterData();
  },

  resetFilters() {
    this.selectedSortOption = null;
    this.selectedColorOption = null;
    this.selectedMaterialOption = null;
    this.isLastOne = false;
    this.isPreOrder = false;
    this.isAvailable = false;

    window.location.href = window.location.pathname;
    localStorage.removeItem("filterData");
  },

  getFilterData() {
    const filterData = JSON.parse(localStorage.getItem("filterData"));

    if (!filterData) return;

    this.selectedSortOption = filterData.selectedSortOption;
    this.selectedColorOption = filterData.selectedColorOption;
    this.selectedMaterialOption = filterData.selectedMaterialOption;
    this.isLastOne = filterData.isLastOne;
    this.isPreOrder = filterData.isPreOrder;
    this.isAvailable = filterData.isAvailable;
    this.isOpen = filterData.isOpen;
  },

  setFilterData() {
    const filterData = {
      selectedSortOption: this.selectedSortOption,
      selectedColorOption: this.selectedColorOption,
      selectedMaterialOption: this.selectedMaterialOption,
      isLastOne: this.isLastOne,
      isPreOrder: this.isPreOrder,
      isAvailable: this.isAvailable,
      isOpen: this.isOpen,
    };

    localStorage.setItem("filterData", JSON.stringify(filterData));
  },

  updateSortOption(value) {
    if (this.selectedSortOption === value) {
      this.selectedSortOption = null;
    } else {
      this.selectedSortOption = value;
    }
  },

  updateColorOption(value) {
    if (this.selectedColorOption === value) {
      this.selectedColorOption = null;
    } else {
      this.selectedColorOption = value;
    }
  },
  updateMaterialOption(value) {
    if (this.selectedMaterialOption === value) {
      this.selectedMaterialOption = null;
    } else {
      this.selectedMaterialOption = value;
    }
    console.log(value);
  },

  submitFilters() {
    let urlParams = new URLSearchParams();

    // Sort
    if (this.selectedSortOption)
      urlParams.append("sort_by", this.selectedSortOption);

    // filter by color
    if (this.selectedColorOption)
      urlParams.append("filter.p.tag", this.selectedColorOption);

    // Filter by material
    if (this.selectedMaterialOption)
      urlParams.append("filter.p.tag", this.selectedMaterialOption);

    // Filter available products
    if (this.isAvailable) urlParams.append("filter.v.availability", 1);

    // Filter by availability
    if (this.isLastOne) urlParams.append("filter.p.tag", "ostatnia-sztuka");

    window.location.href = `${
      window.location.pathname
    }?${urlParams.toString()}`;

    this.setFilterData();
  },
});
