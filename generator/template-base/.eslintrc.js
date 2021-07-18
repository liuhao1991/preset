module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    <%_ if (version === 'v2') { _%>
    'plugin:vue/recommended',
    <%_ } else { _%>
    'plugin:vue/vue3-recommended',
    <%_ } _%>
    '@vue/standard',
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    <%_ if (version === 'v3') { _%>
    "vue/no-multiple-template-root": "off",
    <%_ } _%>
  },
};
