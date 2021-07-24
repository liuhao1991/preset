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
    "vue/no-multiple-template-root": "off",
    <%_ } _%>
    "prettier/prettier": [
      "error",
      {
        semi: true,
        endOfLine: "auto",
      },
    ],
  },
};
