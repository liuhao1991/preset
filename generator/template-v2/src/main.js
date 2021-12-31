import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

<%_ if (options.platform === 'pc') { _%>
import './vendor/element'
<%_ } else { _%>
import  './vendor/vant'
<%_ } _%>
import 'normalize.css'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
