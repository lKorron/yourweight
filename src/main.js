import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import apiPlugin from "./plugins/api";
import loadPlugin from "./plugins/load";

import { defineRule, configure } from "vee-validate";

configure({
  validateOnInput: true,
});

defineRule("number", (value) => {
  const parsedValue = parseInt(value);

  if (isNaN(parsedValue)) {
    return "Введите числовое значение";
  }

  if (parsedValue <= 0) {
    return "Значение не должно быть больше нуля";
  }

  return true;
});

createApp(App)
  .use(store)
  .use(router)
  .use(apiPlugin)
  .use(loadPlugin)
  .mount("#app");
