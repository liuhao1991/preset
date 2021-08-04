module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: "module",
  //   allowImportExportEverywhere: true
  // },
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'off',
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],

    // override configuration set by extending "eslint:recommended"
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],

    // disable rules from base configurations
    'for-direction': 'off'
  }
}
