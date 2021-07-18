import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";



const app = createApp(App);

// setupVendor(app);

app.use(store).use(router).mount("#app");
