import { createStore } from "vuex";
import caloriesModule from "./modules/caloriesModule";
import userDataModule from "./modules/userDataModule";
import periodDataModule from "./modules/periodDataModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    caloriesModule,
    userDataModule,
    periodDataModule,
  },
});
