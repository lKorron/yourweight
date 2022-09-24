import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { defineRule, configure } from "vee-validate";
import { required, email, min, digits, between } from "@vee-validate/rules";

configure({
  validateOnInput: true,
});

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("digits", digits);
defineRule("between", between);

createApp(App).use(store).use(router).mount("#app");
