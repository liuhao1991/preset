import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

<%_ if (options.platform === 'mobile') { _%>
import '../../ui/vant';
<%_ } else { _%>
import '../../ui/element';
<%_ } _%>

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
