import "./assets/css/main.css";
import "./assets/css/noscript.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import worker from "./mocks/browser";

async function prepareApp() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  createApp(App).use(router).mount("#app");
});
