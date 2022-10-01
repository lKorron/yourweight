const caloriesModule = {
  namespaced: true,
  state: {
    commonCalories: 2086,
    targetCalories: 2169,
  },
  getters: {
    getCommonCalories(state) {
      return state.commonCalories;
    },
    getTargetCalories(state) {
      return state.targetCalories;
    },
  },
  mutations: {
    setCommonCalories(state, value) {
      state.commonCalories = value;
    },
    setTargetCalories(state, value) {
      state.targetCalories = value;
    },
  },
  actions: {
    setCommonCalories(context, value) {
      context.commit("setCommonCalories", value);
    },
    setTargetCalories(context, value) {
      context.commit("setTargetCalories", value);
    },
  },
};

export default caloriesModule;
