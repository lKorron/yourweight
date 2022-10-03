const periodDataModule = {
  namespaced: true,
  state: {
    periodData: new Map(),
  },
  getters: {
    getDailyData(state, value) {
      return state.periodData.get(value);
    },
  },
  mutations: {
    setDailyData(state, [key, value]) {
      state.periodData.set(key, value);

      //localStorage.setItem("userData", JSON.stringify(state.userData));
    },
  },
  actions: {
    setDailyData(context, [key, value]) {
      context.commit("setDailyData", [key, value]);
    },
  },
};

export default periodDataModule;
