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

    initStorage(state) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));

      if (storedUserData) {
        state.userData = storedUserData;
      }
    },
  },
  actions: {
    setUserData(context, value) {
      context.commit("setCommonCalories", value);
    },
    setWeight(context, value) {
      context.commit("setWeight", value);
    },
    initStorage(context) {
      context.commit("initStorage");
    },
  },
};

export default userDataModule;
