export default () => {
  return {
    selectedOption: null,
    type: 'color',

    initialize(options, type) {
      const sendMessage = () => {
        this.$dispatch('finish-changed', { finish: 'initialized' });
        window.removeEventListener('DOMContentLoaded', sendMessage);
      };
      window.addEventListener('DOMContentLoaded', sendMessage);

      this.type = type;
      if (this.type === 'color') this.setupColors(options);
    },

    setupColors(options) {
      // Set values from data
      this.options = options;

      // Watch for changes
      this.$watch('selectedOption', (value) => {
        const labels = Array.from(this.$el.querySelectorAll('label'));
        const activeLabel = labels.find((label) => label.children[0].value == value);

        labels.forEach((label) => {
          if (label == activeLabel) return label.classList.add('selected');
          label.classList.remove('selected');
        });

        this.$dispatch('finish-changed', { finish: value });
      });

      // Wait for options to be rendered and set styles according to data
      this.$nextTick(() => {
        const labels = this.$el.querySelectorAll('label');
        labels.forEach((label, i) => {
          label.style.backgroundColor = this.options[i].color;
          // Add tooltip
          label.setAttribute('x-tooltip', this.options[i].name);
        });
      });
    },
  };
};
