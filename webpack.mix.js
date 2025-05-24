const mix = require("laravel-mix");

const tailwindcss = require("@tailwindcss/postcss");

const path = require("path");

mix
  .ts("resources/app.ts", "shopify-theme/assets/shimmer.js")

  .postCss("resources/styles/app.css", "shopify-theme/assets/shimmer.css", [tailwindcss])
  .webpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "resources/scripts/components"),
        "@utils": path.resolve(__dirname, "resources/scripts/utils"),
        "@pages": path.resolve(__dirname, "resources/scripts/pages"),
        "@vendor": path.resolve(__dirname, "resources/scripts/vendor"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
  });
