/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-06 11:29:39
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-02-11 14:51:03
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
    // base js rules
    'max-len': ['error', { 'code': 120, 'ignoreUrls': true }],
    'curly': ["error", "all"],
    'object-curly-spacing': ["error", "always"],
    'semi': ["error", "always"],
    'quotes': ["error", "single"],
    'indent': ["error", 2], // 缩进
    'no-cond-assign': ['error', 'always'],
    'no-const-assign': "error",
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off',
    'no-unused-vars': isProduction ? 'error' : 'warn', // Used for debug
    'no-unreachable': isProduction ? 'error' : 'warn', // Used for debug
    'space-before-function-paren': ['error', 'always'],
    // vue rules
    <%_ if (options.version === 'v3') { _%>
    'vue/no-multiple-template-root': 'off', // off | error
    'vue/no-v-model-argument': 'off',
    <%_ } _%>
    'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/require-default-prop': ['error'],
    'vue/require-prop-types': ['error'],
    "vue/script-indent": ["error", 2, { // script 不缩进
      "baseIndent": 0,
      "switchCase": 1,
      "ignores": []
    }],
    'vue/html-indent': [
      'error',
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
      'error',
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
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: false,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
      },
    ],
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
  },
}
