const userDataModule = {
  namespaced: true,
  state: {
    userData: {
      height: 0,
      weight: 0,
      age: 0,
      coeff: 0,
      sex: "",
      targetWeight: 0,
    },
  },
  getters: {
    getUserData(state) {
      return state.userData;
    },
  },
  mutations: {
    setCommonCalories(state, value) {
      Object.entries(value).forEach(([key, val]) => {
        state.userData[key] = val;
      });
    },
  },
  actions: {
    setUserData(context, value) {
      context.commit("setCommonCalories", value);
    },
  },
};

export default userDataModule;
