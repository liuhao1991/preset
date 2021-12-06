/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-23 10:31:17
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-06 11:42:33
 * @Description: ...
 */
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'TITLE'
      return args
    })
    // config.module
    //   .rule("vue")
    //   .use("vue-loader")
    //   .tap((options) => {
    //     options
    //     // modify the options...
    //     return options;
    //   });
  }
}
