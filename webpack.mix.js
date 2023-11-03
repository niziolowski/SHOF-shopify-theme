const mix = require("laravel-mix");

mix
  .js("src/js/app.js", "assets")
  .postCss("src/css/app.css", "assets", [
    require("postcss-import"),
    require("tailwindcss")("./tailwind.config.js"),
  ])
  .options({
    processCssUrls: false,
  })
  .sourceMaps();

// Define your entry JavaScript file and output paths as needed.
// Adjust 'resources/js/app.js' and 'assets/js' paths accordingly.
