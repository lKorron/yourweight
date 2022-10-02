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
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    initStorage(state) {
      state.userData = JSON.parse(localStorage.getItem("userData"));
    },
  },
  actions: {
    setUserData(context, value) {
      context.commit("setCommonCalories", value);
    },
    initStorage(context) {
      context.commit("initStorage");
    },
  },
};

export default userDataModule;
