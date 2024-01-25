import instaFeed from './instaFeed.js'; // A function for adding reveal effect to InstaFeed third-party widget
import helpers from './helpers.js';

import './alpine/alpine.js'; // AlpineJS setup

window.helpers = helpers;

window.addEventListener('load', () => {
  instaFeed(); // add reveal effect for instaFeed app
});
