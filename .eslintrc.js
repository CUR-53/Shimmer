const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
        moduleDirectory: ["node_modules", "resources"], // Ensure node_modules is included
      },
      webpack: {
        config: path.resolve(__dirname, "webpack.mix.js"),
      },
    },
  },

  rules: {
    "lines-between-class-members": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["webpack.mix.js", "*.config.js", "entries.js"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
    "no-unreachable": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
