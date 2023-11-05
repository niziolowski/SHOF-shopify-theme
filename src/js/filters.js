export default () => ({
  sortOptions: [
    {
      value: "date_ascending",
      label: "Od najnowszych",
    },
    { value: "price_ascending", label: "Od najtańszych" },
    {
      value: "price_descending",
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

  availabilityOptions: [],
  selectedSortOption: [],
  selectedColorOptions: [],
  selectedMaterialOptions: [],
  isLastOnes: false,
  isPreOrder: false,

  initialize() {
    this.submitFilters();
  },

  submitFilters() {
    let urlParams = new URLSearchParams();

    // Filter unavailable products by default
    urlParams.append("filter.v.availability", 1);

    // Sort by price ascending
    if (this.selectedSortOption)
      urlParams.append("sort_by", this.selectedSortOption);

    // filter by color
    for (let color of this.selectedColorOptions) {
      urlParams.append("filter.p.tag", color);
    }

    // Filter by material
    for (let material of this.selectedMaterialOptions) {
      urlParams.append("filter.p.tag", material);
    }

    // Filter by availability
    if (this.isLastOnes) urlParams.append("filter.v.quantity", "1");

    window.location.href = `${
      window.location.pathname
    }?${urlParams.toString()}`;
  },
});
