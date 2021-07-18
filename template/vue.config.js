module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   *  publicPath: process.env.NODE_ENV === 'production' ? `/${pkg.name}/` : './'
   */
  publicPath: process.env.BASE_PATH,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    }
    // 代理示例 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000', // 后端接口地址
    //     ws: true,
    //     changeOrigin: true, // 是否允许跨域
    //     pathRewrite: {
    //       '^/api': ''   // 直接用'api/接口名'进行请求.
    //     }
    //   }
    // }
  },
  transpileDependencies: ['vue', 'vue-router', '@vue'],
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {
      less: {
        // 全局注入变量及mixins
        additionalData: `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`,
      }
    }
  },
  configureWebpack: () => ({
    name: `${pkg.name}`,
    resolve: {
      alias: {
        '@': resolve('src'),
        // 文件别名
        // services: resolve('src/services'),
        // variable: resolve('src/assets/style/variable.less'),
        // utils: resolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm'),
        // mixins: resolve('node_modules/@winner-fed/magicless/magicless.less'),
      }
    },
    // plugins: genPlugins(),
    // // https://github.com/cklwblove/vue-cli3-template/issues/12
    // optimization: getOptimization()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // module

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-eval-source-map')
      );

    // plugin

    // preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config
      .plugin('preload')
      .tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config
      .plugins
      .delete('prefetch');

    // webpack-html-plugin
    config
      .plugin('html')
      .tap((args) => {
        args[0].minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        };
        return args;
      });
    // optimization
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();

          config
            .optimization
            .splitChunks({
              chunks: 'all',
              cacheGroups: {
                vendors: {
                  name: 'chunk-vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可自定义拓展你的规则
                  minChunks: 3, // 最小公用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk('single');
        }
      );
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
};
