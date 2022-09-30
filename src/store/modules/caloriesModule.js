const caloriesModule = {
  namespaced: true,
  state: {
    calories: 2,
  },
  actions: {
    setCalories(context, value) {
      context.commit("setCalories", value);
    },
  },
  mutations: {
    setCalories(state, value) {
      // `state` is the local module state
      state.calories = value;
    },
  },
  getters: {
    getCalories(state) {
      return state.calories;
    },
  },
};

export default caloriesModule;
