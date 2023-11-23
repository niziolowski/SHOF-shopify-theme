export default (el, { modifiers, expression }, { cleanup }) => {
  let tooltipText = expression;
  let tooltipArrow = !modifiers.includes('noarrow');
  let tooltipPosition = 'top';
  let tooltipId = 'tooltip-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  let positions = ['top', 'bottom', 'left', 'right'];
  let elementPosition = getComputedStyle(el).position;

  for (let position of positions) {
    if (modifiers.includes(position)) {
      tooltipPosition = position;
      break;
    }
  }

  if (!['relative', 'absolute', 'fixed'].includes(elementPosition)) {
    el.style.position = 'relative';
  }

  // Define the styles for the tooltip and arrow
  const tooltipStyles = {
    base: `position: absolute; width: auto; color: #333; background-color: white; border: 1px solid #ccc; border-radius: 0.4rem; padding: 0.25rem 0.5rem;`,
    top: `bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-0.125rem);`,
    bottom: `top: 100%; left: 50%; transform: translateX(-50%) translateY(0.125rem);`,
    left: `top: 50%; right: 100%; transform: translateY(-50%) translateX(-0.375rem);`,
    right: `top: 50%; left: 100%; transform: translateY(-50%) translateX(0.375rem);`,
  };

  const arrowStyles = {
    base: `position: absolute; width: 0.625rem; height: 0.625rem; background-color: white; border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;`,
    top: `top: 100%; left: 50%; transform: translateX(-50%) rotate(45deg);`,
    bottom: `bottom: 100%; left: 50%; transform: translateX(-50%) rotate(225deg);`,
    left: `top: 50%; left: 100%; transform: translateY(-50%) rotate(90deg);`,
    right: `top: 50%; right: 100%; transform: translateY(-50%) rotate(270deg);`,
  };

  // Construct the tooltip HTML with inline styles
  let tooltipHTML = `
    <div id="${tooltipId}" class="shadow-m" x-data="{ tooltipVisible: false, tooltipText: '${tooltipText}', tooltipArrow: ${tooltipArrow}, tooltipPosition: '${tooltipPosition}' }" x-ref="tooltip" x-init="setTimeout(function(){ tooltipVisible = true; }, 500);" x-show="tooltipVisible" style="${tooltipStyles.base} ${tooltipStyles[tooltipPosition]}" x-cloak>
      <div x-show="tooltipVisible" x-transition style="position: relative;">
        <p x-text="tooltipText" style="flex-shrink: 0; display: block; font-size: 1rem; white-space: nowrap;"></p>
        <div x-ref="tooltipArrow" x-show="tooltipArrow" style="${arrowStyles.base} ${arrowStyles[tooltipPosition]}" class="tooltip-arrow">
          <div style="transform: rotate(45deg);"></div>
        </div>
      </div>
    </div>
  `;

  el.dataset.tooltip = tooltipId;

  let mouseEnter = function (event) {
    el.insertAdjacentHTML('beforeend', tooltipHTML);
  };

  let mouseLeave = function (event) {
    let tooltipEl = document.getElementById(tooltipId);
    if (tooltipEl) {
      tooltipEl.remove();
    }
  };

  el.addEventListener('mouseenter', mouseEnter);
  el.addEventListener('mouseleave', mouseLeave);

  cleanup(() => {
    el.removeEventListener('mouseenter', mouseEnter);
    el.removeEventListener('mouseleave', mouseLeave);
  });
};
