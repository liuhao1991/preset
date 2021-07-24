const plugins = ["@babel/plugin-proposal-optional-chaining"];

<%_ if (options.platform === 'pc') { _%>
plugins.push(
  ['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }, 'vant']
);<%_ } _%>

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
