const extends = ["eslint:recommended", "@vue/prettier"];
<%_ if (options.version === 'v2') { _%>
extends.concat([], ["plugin:vue/essential"], extends);
<%_ } else { _%>
extends.concat([], ["plugin:vue/vue3-essential"], extends);
<%_ } _%>

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
    <%_ if (options.version === 'v3') { _%>
    "vue/no-multiple-template-root": "off",
    <%_ } _%>
  },
};
