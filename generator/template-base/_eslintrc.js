module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    <%_ if (options.version === 'v2') { _%>
    'plugin:vue/essential',
    <%_ } else { _%>
    'plugin:vue/vue3-essential',
    <%_ } _%>
    '@vue/prettier',
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    <%_ if (options.version === 'v3') { _%>
    "vue/no-multiple-template-root": "off", // off | error
    <%_ } _%>
    "vue/html-quotes": ["error", "double", { avoidEscape: false }],
    "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
    "vue/require-default-prop": ["error"],
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
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/no-unused-components": [
      "error",
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        semi: true,
        endOfLine: "auto",
      },
    ],
  },
};
