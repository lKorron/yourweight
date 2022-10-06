const userDataModule = {
  namespaced: true,
  state: {
    userData: {
      height: null,
      weight: null,
      age: null,
      coeff: null,
      sex: null,
      targetWeight: null,
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
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    setWeight(state, value) {
      state.userData.weight = value;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    setUserData(state, value) {
      state.userData = value;
    },
  },
  actions: {
    setUserData(context, value) {
      context.commit("setCommonCalories", value);
    },
    setWeight(context, value) {
      context.commit("setWeight", value);
    },
  },
};

export default userDataModule;
