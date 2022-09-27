export default {
  install: (app) => {
    app.config.globalProperties.$load = async (action, errorHandler) => {
      try {
        await action;
      } catch (error) {
        if (errorHandler) {
          errorHandler(error);
        } else {
          console.log(error.response.data);
        }
      }
    };
  },
};
