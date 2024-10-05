import { createApp } from "vue";
import "../assets/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/auth";

const app = createApp(App);

async function init() {
  const pinia = createPinia();
  app.use(pinia);

  await useAuthStore().checkAuth();

  app.use(router);
  app.mount("#app");
}

init(); // Call the async function
