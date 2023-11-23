export default (el, { modifiers, expression }, { cleanup }) => {
  let items = el.children;
  // get the duration and delay from the modifiers (the pattern: x-reveal.delay.100.duration.200)
  let delay = +modifiers[modifiers.indexOf('delay') + 1] || 100;
  let duration = +modifiers[modifiers.indexOf('duration') + 1] || 500;

  // Set parent attributes
  el.setAttribute('x-data', `{ show: false }`);
  el.setAttribute('x-intersect.once', 'show = true');

  // Set children attributes
  Array.from(items).forEach((item, index) => {
    item.setAttribute('x-show', 'show');
    item.setAttribute(`x-transition:enter.duration.${duration}ms.delay.${delay * index}ms`, '');
  });
};
