const caloriesModule = {
  state: () => ({
    calories: 0,
  }),
  actions: {
    setCalories(context, value) {
      context.commit("setCaloris", value);
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
