import { callWithAsyncErrorHandling, provide } from "vue";

export default {
  install: (app) => {
    app.config.globalProperties.$load = load;

    app.provide("load", load);
  },
};

const load = async (action, errorHandler) => {
  try {
    await action();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    } else {
      console.log("error");
      console.log(error);
    }
  }
};

module.exports = load;
