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
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  });
  api.extendPackage({
    'dependencies': {
      'axios': '^0.19.0',
      'lodash': '^4.17.15',
      'normalize.css': '^8.0.1',
    },
    'devDependencies': {
      '@babel/plugin-proposal-optional-chaining': '^7.9.0',
      // '@commitlint/cli': '^8.3.5',
      // '@commitlint/config-conventional': '^8.3.4',
      // 'commitizen': '^4.0.4',
      'compression-webpack-plugin': '^3.1.0',
      'cross-env': '^7.0.2',
      // 'cz-conventional-changelog': '^3.1.0',
      'vue-cli-plugin-webpack-bundle-analyzer': '~2.0.0',
    },
    'scripts': {
      'build:dev': 'vue-cli-service build --mode development',
      'build:prod': 'vue-cli-service build --mode production',
      'test:unit': 'cross-env NODE_ENV=test vue-cli-service test:unit',
      'test:e2e': 'cross-env NODE_ENV=test vue-cli-service test:e2e',
      'lint': 'vue-cli-service lint src/**/*.{js,vue} tests/**/*.js --fix'
    },
    // 'config': {
    //   'commitizen': {
    //     'path': 'node_modules/cz-conventional-changelog'
    //   }
    // },
    // 'gitHooks': {
    //   'pre-commit': 'lint-staged',
    //   'commit-msg': 'commitlint -e $GIT_PARAMS'
    // },
    // 'lint-staged': {
    //   'src/**/*.{js,jsx,vue}': [
    //     'vue-cli-service lint --fix',
    //     'git add'
    //   ],
    //   'tests/**/*.js': [
    //     'vue-cli-service lint --fix',
    //     'git add'
    //   ]
    // }
  });

  // api.extendPackage({
  //   dependencies: {
  //     vue: '^3.0.5',
  //     'vue-router': '^4.0.3'
  //   },
  //   devDependencies: {
  //     '@vue/compiler-sfc': '^3.0.0',
  //   }
  // });



  api.render('./template');

  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}

module.exports.hooks = api => {
  api.afterInvoke(() => {
    // Problem with App.vue not being updated correctly.
    // Workaround at https://github.com/vuejs/vue-cli/issues/5106#issuecomment-579509196 :
    // vue-router must be added to the "plugins" section of the preset.json file.
    //
    //let mainTemplateVuePath = api.resolve('./src/App.tmpl.vue');
    //let mainVuePath = mainTemplateVuePath.replace(/App\.tmpl\.vue$/, 'App.vue');
    //fs.unlinkSync(mainVuePath);
    //fs.renameSync(mainTemplateVuePath, mainVuePath);

    if (directoryExits(api.resolve('./src/store'))) {
      lignator.remove(api.resolve('./src/store'));
    }
    if (directoryExits(api.resolve('./src/router'))) {
      lignator.remove(api.resolve('./src/router'));
    }
  });
};
