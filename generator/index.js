
module.exports = (api, options, rootOptions) => {
  // const v2 = options.vueVersion === 'v2';
    const v2 = options.version === 'v2';
    const mobile = options.platform === 'mobile';
    // options.ui = options.ui || 'none';

    // 添加依赖
    const dependencies = {
      qs: '^6.7.0',
      axios: '^0.21.0',
      'normalize.css': '^8.0.1',
      'less-loader': '^7.3.0',
    };

    const devDependencies = {
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-service": "~4.5.0",
      "@vue/eslint-config-prettier": "^6.0.0",
      "babel-eslint": "^10.1.0",
      "babel-plugin-transform-remove-console": "^6.9.4",
      "babel-plugin-transform-remove-debugger": "^6.9.4",
      "eslint": "^6.7.2",
      "eslint-config-tpconfig": "^0.x",
      "eslint-plugin-prettier": "^3.3.1",
      "eslint-plugin-vue": "^7.0.0-0",
      "less": "^3.0.4",
      "less-loader": "^5.0.0",
      "prettier": "^2.2.1",
      "style-resources-loader": "^1.3.2",
      "stylelint": "^13.9.0",
      "stylelint-webpack-plugin": "^2.1.1",
      "webpack-bundle-analyzer": "^4.3.0"
    }
    // // UI 框架
    if (!mobile) {
      if (v2) {
        dependencies['element-ui'] = '^2.15.0';
      } else {
        dependencies['element-plus'] = '^1.0.1-beta.27';
      }
    } else {
      if (v2) {
        dependencies['vant'] = '^2.15.0';
      } else {
        dependencies['vant'] = '^3.0.0-beta.1';
      }
    }
    api.extendPackage({
      dependencies,
      devDependencies
    });
    if (v2) {
      api.extendPackage({
        dependencies: {
          vue: '^2.6.14',
          'vue-router': '^3.4.9',
          vuex: '^3.6.0',
        },
        devDependencies:{
          "vue-template-compiler": "^2.6.11",
        }
      });

    } else {
      api.extendPackage({
        dependencies: {
          vue: '^3.0.0',
          'vue-router': '^4.0.0-0',
          vuex: '^4.0.0-0',
        },
        devDependencies: {
          '@vue/compiler-sfc': '^3.0.0',
        },
      });
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
    // api.extendPackage({
    //     scripts: {
    //         stylelint: 'stylelint \'src/**/*.{vue,html,css,less,scss,sass}\' --fix',
    //     },
    //     husky: {
    //         hooks: {
    //             'pre-commit': 'lint-staged',
    //             'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    //         },
    //     },
    //     'lint-staged': {
    //         '*.{js,vue}': 'npm run lint',
    //         '*.{vue,html,css,less,scss,sass}': 'npm run stylelint',
    //     },
    //     config: {
    //         commitizen: {
    //             path: './node_modules/cz-conventional-changelog',
    //         },
    //     },
    //     devDependencies: {
    //         '@commitlint/cli': '^11.0.0',
    //         '@commitlint/config-conventional': '^11.0.0',
    //         'cz-conventional-changelog': '^3.3.0',
    //         husky: '^4.3.8',
    //         'lint-staged': '^10.5.3',
    //     },
    // });

    // UI 框架
    // if (options.ui === 'element') {
    //     // element 替换主题色需要使用 sass
    //     api.extendPackage({
    //         devDependencies: {
    //             'sass-loader': '^7.1.0',
    //             'node-sass': '^4.14.1',
    //         },
    //     });
    // }

    // 创建模板
    api.render('./template-base', options);
    // if (v2) {
    //   // api.render('./template-v2', options);
    // } else {
    //   api.render('./template-v3', options);
    // }

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
};
