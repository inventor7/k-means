import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/index.css";

import App from "./App.vue";
import router from "./router";
import { i18n } from "./router/guards/useLanguageGuard";

const pinia = createPinia();
const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);

app.mount("#app");
