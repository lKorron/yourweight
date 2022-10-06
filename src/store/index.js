import { createStore } from "vuex";
import caloriesModule from "./modules/caloriesModule";
import userDataModule from "./modules/userDataModule";
import periodDataModule from "./modules/periodDataModule";

const initPlugin = (store) => {
  let periodData = JSON.parse(localStorage.getItem("periodData"));

  if (periodData) {
    Object.entries(periodData).forEach(([key, value]) => {
      store.dispatch("periodDataModule/setDailyData", [key, value]);
    });
  }
};

export default createStore({
  state: {},
  plugins: [initPlugin],
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    caloriesModule,
    userDataModule,
    periodDataModule,
  },
});
