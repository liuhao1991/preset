import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
<%_ if (options.platform === 'pc') { _%>
import setupVendor from './vendor/element-v3';
<%_ } else { _%>
import setupVendor from './vendor/vant-v3';
<%_ } _%>


const app = createApp(App);

setupVendor(app);

app.use(store).use(router).mount("#app");
