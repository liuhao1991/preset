import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// <%_ if (options.platform === 'mobile') { _%>
// import setupVendor from '../../ui/vant-v3';
// <%_ } else { _%>
// import setupVendor from '../../ui/element-v3';
// <%_ } _%>


const app = createApp(App);

setupVendor(app);

app.use(store).use(router).mount("#app");
