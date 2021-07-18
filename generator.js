const fs = require('fs');
// XXX: require('lignator') will only work with "vue add my-vue-preset" or "npm install --save-dev file:/local/path/to/my-vue-preset"
// + "vue invoke my-vue-preset" but not with "vue create my-vue-project --preset my-vue-preset",
// i.e. it will work if this project is used as a vue-cli plugin but not as a vue-cli preset (no project dependencies will be loaded!),
// so for now we provide a local lignator file as a fallback plan.
// To be used as vue-cli plugin, note that this project should be named in package.json as @MUTASANTE/vue-cli-plugin-preset-tpl
// and registered on npmjs.com as @MUTASANTE/preset-tpl
try {
  var lignator = require('lignator');
} catch (e) {
  if (e instanceof Error && e.code === 'MODULE_NOT_FOUND')
    lignator = require('./lignator');
  else throw e;
}

module.exports = (api, options, rootOptions) => {
  // const v2 = options.vueVersion === 'v2';
    // const v2 = options.version === 'v2';
    // options.ui = options.ui || 'none';

    // 添加依赖
    const dependencies = {
        qs: '^6.7.0',
        axios: '^0.21.0',
        'tp-common.css': '^1.0.2',
    };
    // // UI 框架
    // if (options.ui === 'element') {
    //     if (v2) {
    //         dependencies['element-ui'] = '^2.15.0';
    //     } else {
    //         dependencies['element-plus'] = '^1.0.1-beta.27';
    //     }
    // }
    api.extendPackage({
        dependencies,
        devDependencies: {
            'eslint-config-tpconfig': '^0.x',
            'eslint-plugin-vue': '^7.0.0-0',
            'style-resources-loader': '^1.3.2',
            stylelint: '^13.9.0',
            '@trscd/stylelint-config-tpconfig': '^0.x',
            'stylelint-webpack-plugin': '^2.1.1',
            'webpack-bundle-analyzer': '^4.3.0',
            'babel-plugin-transform-remove-console': '^6.9.4',
            'babel-plugin-transform-remove-debugger': '^6.9.4',
        },
    });

    api.extendPackage({
        dependencies: {
            vue: '^3.0.0',
            'vue-router': '^4.0.0-0',
            vuex: '^4.0.0-0',
        },
        devDependencies: {
            'vue-template-compiler': null,
            '@vue/compiler-sfc': '^3.0.0',
        },
    });

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
    api.render('./template');

    // 删除不必要的文件
    const deletePath = [
        'src/assets/logo.png',
        'src/components/HelloWorld.vue',
    ];

    api.render(files => {
        Object.keys(files).forEach(path => {
            if (deletePath.find(p => path.indexOf(p) === 0)) {
                delete files[path];
            }
        });
    });

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
