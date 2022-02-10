/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-06 11:29:39
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-02-10 17:11:50
 * @Description: ...
 */
let isProduction = process.env.NODE_ENV === 'production';
const os = require('os');
const isWindows = os.platform() === 'win32';
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
    '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off',
    'no-unused-vars': isProduction ? 'error' : 'warn', // Used for debug
    'no-unreachable': isProduction ? 'error' : 'warn', // Used for debug
    'space-before-function-paren': ['error', 'always'],
    <%_ if (options.version === 'v3') { _%>
    'vue/no-multiple-template-root': 'off', // off | error
    'vue/no-v-model-argument': 'off',
    <%_ } _%>
    'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/require-default-prop': ['error'],
    'vue/require-prop-types': ['error'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
          allowFirstLine: true
        },
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
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
        ignoreWhenEmpty: false,
        ignores: ['pre', 'textarea'],
      },
    ],
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: isWindows ? 'crlf' : 'lf',
        printWidth: 120, // 强制长度120字符
        singleQuote: true, // 强制单引号
        semi: true, // 强制分号结尾
        // eslint 规则在此定义,后续根据需要进行添加或修改原有规则
      },
    ],
  },
}
