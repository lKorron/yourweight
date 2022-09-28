import { provide } from "vue";

export default {
  install: (app) => {
    const load = async (action, errorHandler) => {
      try {
        await action();
      } catch (error) {
        if (errorHandler) {
          errorHandler(error);
        } else {
          console.log("error");
          console.log(error.response.data);
        }
      }
    };

    app.config.globalProperties.$load = load;

    app.provide("load", load);
  },
};
