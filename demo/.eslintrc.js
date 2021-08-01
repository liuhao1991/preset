module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // "plugin:vue/essential",
    // "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier",
    // "@vue/prettier",

    // "@vue/prettier",
    // "prettier/vue",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-cond-assign": "warn",
    // "prettier/prettier": [
    //   "error",
    //   {
    //     semi: true,
    //     endOfLine: "auto",
    //     // htmlWhitespaceSensitivity: "ignore",
    //   },
    //   { usePrettierrc: true },
    // ],
    "vue/html-quotes": ["error", "double", { avoidEscape: false }],
    "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
    "vue/require-default-prop": ["error"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any",
        },
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 3,
          allowFirstLine: true,
        },
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: false,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
      },
    ],
    "vue/no-unused-components": [
      "error",
      {
        ignoreWhenBindingPresent: true,
      },
    ],
  },
};
