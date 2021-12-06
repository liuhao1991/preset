
module.exports = (api, options, rootOptions) => {
  // const v2 = options.vueVersion === 'v2';
  const v2 = options.version === 'v2'
  const mobile = options.platform === 'mobile'
  // options.ui = options.ui || 'none';

  api.extendPackage({
    scripts: {
      lint: 'vue-cli-service lint'
    }
  })
  // 添加依赖
  const dependencies = {
    qs: '^6.7.0',
    axios: '^0.21.0',
    'normalize.css': '^8.0.1',
    dayjs: '^1.10.6'
  }

  const devDependencies = {
    '@vue/cli-plugin-babel': '~4.5.0',
    '@vue/cli-plugin-eslint': '~4.5.0',
    '@vue/cli-plugin-router': '~4.5.0',
    '@vue/cli-plugin-vuex': '~4.5.0',
    '@vue/eslint-config-standard': '^5.1.2',
    '@babel/plugin-proposal-optional-chaining': '^7.14.5',
    'babel-eslint': '^10.1.0',
    'babel-plugin-transform-remove-console': '^6.9.4',
    'babel-plugin-transform-remove-debugger': '^6.9.4',
    'eslint': '^6.7.2',
    'eslint-plugin-standard': '^4.0.0',
    'eslint-plugin-import': '^2.20.2',
    'eslint-plugin-node': '^11.1.0',
    'eslint-plugin-promise': '^4.2.1',
    'less': '^3.0.4',
    'less-loader': '^5.0.0',
    'style-resources-loader': '^1.3.2',
    'stylelint': '^13.9.0',
    'stylelint-webpack-plugin': '^2.1.1',
    'webpack-bundle-analyzer': '^4.3.0'
  }
  // // UI 框架
  if (!mobile) {
    if (v2) {
      dependencies['element-ui'] = '^2.15.0'
    } else {
      dependencies['element-plus'] = '^1.2.0-beta.3'
    }
  } else {

    if (v2) {
      dependencies['vant'] = '^2.8.7'
    } else {
      dependencies['vant'] = '^v3.3.6'
    }
    api.extendPackage({
      devDependencies: {
        'babel-plugin-import': '^1.13.0'
      }
    })
  }
  api.extendPackage({
    dependencies,
    devDependencies
  })
  if (v2) {
    api.extendPackage({
      dependencies: {
        vue: '^2.6.14',
        'vue-router': '^3.4.9',
        vuex: '^3.6.0'
      },
      devDependencies:{
        'vue-template-compiler': '^2.6.11',
        'eslint-plugin-vue': '^6.2.2'
      }
    })
  } else {
    api.extendPackage({
      dependencies: {
        vue: '^3.2.6',
        'vue-router': '^4.0.11',
        pinia: '^2.0.6'
      },
      devDependencies: {
        '@vue/compiler-sfc': '^3.2.6',
        'eslint-plugin-vue': '^7.0.0'
      }
    })
  }

  // api.extendPackage({
  //   dependencies: {
  //     vue: '^3.0.0',
  //     'vue-router': '^4.0.0-0',
  //     vuex: '^4.0.0-0',
  //   },
  //   devDependencies: {
  //     'vue-template-compiler': null,
  //     '@vue/compiler-sfc': '^3.0.0',
  //   },
  // });

  // 数据可视化大屏依赖
  // if (options.type === 'data-v') {
  //     api.extendPackage({
  //         dependencies: {
  //             echarts: '^5.0.0',
  //             'animate.css': '^4.1.1',
  //             lodash: '^4.17.21',
  //             'resize-observer-polyfill': '^1.5.1',
  //         },
  //     });
  // }

  // git hook and commitlint
  api.extendPackage({
    scripts: {
      // stylelint: 'stylelint \'src/**/*.{vue,html,css,less,scss,sass}\' --fix'
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged'
        // 'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
      }
    },
    'lint-staged': {
      '*.{js,vue}': 'npm run lint'
      // '*.{vue,html,css,less,scss,sass}': 'npm run stylelint'
    },
    // config: {
    //   commitizen: {
    //     path: './node_modules/cz-conventional-changelog',
    //   },
    // },
    devDependencies: {
      // '@commitlint/cli': '^11.0.0',
      // '@commitlint/config-conventional': '^11.0.0',
      // 'cz-conventional-changelog': '^3.3.0',
      husky: '^4.3.8',
      'lint-staged': '^10.5.3'
    }
  })

  // UI 框架
  // if (!mobile) {
  //   // element 替换主题色需要使用 sass
  //   api.extendPackage({
  //     devDependencies: {
  //       'sass-loader': '^7.1.0',
  //       'node-sass': '^4.14.1',
  //     },
  //   });
  // }
  // 删除 vue-cli3 默认目录
  // api.render((files) => {
  //   Object.keys(files)
  //     .filter((path) => path.startsWith('src/') || path.startsWith('public/'))
  //     .forEach((path) => delete files[path]);
  // });
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith('src/') || path.startsWith('public/'))
      .forEach((path) => delete files[path])
  })

  if (mobile) {
    if (options.version === 'v2') {
      api.render('../ui/vant')
    } else {
      api.render('../ui/vant-v3')
    }
    // api.injectImports('src/vendor/index.js', `import './vant.js'`);
  } else {
    if (options.version === 'v2') {
      api.render('../ui/element')
    } else {
      api.render('../ui/element-v3')
    }
  }
  api.onCreateComplete(() => {})
  // 创建模板
  api.render('./template-base', options)
  if (v2) {
    api.render('./template-v2', options)
  } else {
    api.render('./template-v3', options)
  }

  // const deletePath = [
  //   'src/assets/logo.png',
  //   'src/components/HelloWorld.vue',
  // ];
  // api.render(files => {
  //   Object.keys(files).forEach(path => {
  //     if (deletePath.find(p => path.indexOf(p) === 0)) {
  //       delete files[path];
  //     }
  //   });
  // });

  // 安装的 node-sass 包内缺少 vendor 文件夹
  // 需要执行 npm rebuild node-sass 生成
  // if (options.ui === 'element') {
  //     api.onCreateComplete(() => {
  //         const exec = require('child_process').execSync;
  //         const path = api.resolve();
  //         exec('npm rebuild node-sass', { stdio: 'inherit', cwd: path });
  //     });
  // }
}
