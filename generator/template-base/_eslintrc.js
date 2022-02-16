/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-06 11:29:39
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-02-16 17:46:23
 * @Description: ...
 */
let isProduction = process.env.NODE_ENV === 'production';
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
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // basic js rules
    'max-len': [2, { 'code': 120, 'ignoreUrls': true }],
    'curly': 2,
    'object-curly-spacing': [2, "always"],
    'semi': [2, "always"],
    'quotes': [2, "single"],
    'indent': [2, 2], // 缩进
    'no-cond-assign': [2, 'always'],
    'no-const-assign': 2,
    'no-console': isProduction ? 2 : 0,
    'no-debugger': isProduction ? 2 : 0,
    'no-unused-vars': isProduction ? 2 : 0, // Used for debug
    'no-unreachable': isProduction ? 2 : 0, // Used for debug
    'space-before-function-paren': [2, 'always'],
    'func-call-spacing': 2,
    'block-spacing': 2,
    'semi-spacing': 2,
    // vue rules
    <%_ if (options.version === 'v3') { _%>
    'vue/no-multiple-template-root': 0, // off | error
    'vue/no-v-model-argument': 0,
    <%_ } _%>
    'vue/html-quotes': [2, 'double', { avoidEscape: false }],
    'vue/no-spaces-around-equal-signs-in-attribute': [2],
    'vue/require-default-prop': [2],
    'vue/require-prop-types': [2],
    "vue/script-indent": [2, 2, { // script 不缩进
      "baseIndent": 0,
      "switchCase": 1,
      "ignores": []
    }],
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/max-attributes-per-line': [
      2,
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
    // 'vue/first-attribute-linebreak': ["error", {
    //   "singleline": "ignore",
    //   "multiline": "below"
    // }],
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': [
      2,
      {
        ignoreWhenNoAttributes: false,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
      },
    ],
    'vue/no-unused-components': [
      2,
      {
        ignoreWhenBindingPresent: true,
      },
    ],
  },
}
