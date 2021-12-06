/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-06 11:29:39
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-06 11:48:18
 * @Description: ...
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
<%_ if (options.platform === 'pc') { _%>
import setupVendor from './vendor/element-v3'
<%_ } else { _%>
import setupVendor from './vendor/vant-v3'
<%_ } _%>

const app = createApp(App)

setupVendor(app)

app.use(createPinia()).use(router).mount('#app')
