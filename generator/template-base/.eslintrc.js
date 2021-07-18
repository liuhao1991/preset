let extends = [];
// <%_ if (options.version === 'v2') { _%>
// extends = ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"];
// <%_ } else { _%>
extends = ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"];
// <%_ } _%>

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: extends,
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-multiple-template-root": "off",
  },
};
