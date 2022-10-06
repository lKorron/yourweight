const periodDataModule = {
  namespaced: true,
  state: {
    periodData: new Map(),
  },
  getters: {
    getDailyData(state, value) {
      return state.periodData.get(value);
    },
    getDailyCalories: (state) => (value) => {
      const foodList = state.periodData.get(value);

      let summaryCalories = 0;
      foodList.forEach(({ calories }) => {
        summaryCalories += calories;
      });

      return summaryCalories;
    },
    getPeriod(state) {
      return state.periodData;
    },
  },
  mutations: {
    setDailyData(state, [key, value]) {
      state.periodData.set(key, value);

      const period = Object.fromEntries(state.periodData);

      localStorage.setItem("periodData", JSON.stringify(period));
    },
  },
  actions: {
    setDailyData(context, [key, value]) {
      context.commit("setDailyData", [key, value]);
    },
  },
};

export default periodDataModule;
