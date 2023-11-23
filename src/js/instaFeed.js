// Check if instagram feed is present on the page. If so, add AlpineJS attributes to it.
export default () => {
  const instagramFeed = document.querySelector('.tz-d');
  if (instagramFeed) {
    instagramFeed.setAttribute('x-data', '');
    instagramFeed.setAttribute('x-reveal', '  ');
  }
};
