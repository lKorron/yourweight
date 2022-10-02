import { createStore } from "vuex";
import caloriesModule from "./modules/caloriesModule";
import userDataModule from "./modules/userDataModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    caloriesModule,
    userDataModule,
  },
});
