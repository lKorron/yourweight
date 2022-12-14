import moment from "moment";

const sortDateMap = (map) => {
  const sortedMap = new Map(
    [...map.entries()].sort(([a], [b]) => {
      a = a.split("/").reverse().join("");
      b = b.split("/").reverse().join("");
      return a > b ? 1 : a < b ? -1 : 0;
    })
  );

  return sortedMap;
};

const periodDataModule = {
  namespaced: true,
  state: {
    periodData: new Map(),
  },
  getters: {
    getDailyData: (state) => (value) => {
      return state.periodData.get(value);
    },
    getDailyCalories: (state) => (value) => {
      const foodList = state.periodData.get(value);

      let summaryCalories = 0;
      foodList.forEach(({ calories }) => {
        summaryCalories += calories;
      });

      return summaryCalories;
    },
    getTodayData(state) {
      let date = moment().format("DD/MM/YYYY");
      const value = state.periodData.get(date);

      if (value) {
        const map = new Map();
        map.set(date, value);
        return map;
      }

      return null;
    },

    getPeriod(state) {
      return state.periodData;
    },
    getPartialPeriod: (state) => (count) => {
      const slicedArray = Array.from(state.periodData).slice(-count);
      return new Map(slicedArray);
    },
    getDays(state) {
      return Array.from(state.periodData.keys());
    },
    getCalories(state, getters) {
      const days = getters.getDays;
      const caloriesArray = [];
      days.forEach((day) => {
        caloriesArray.push(getters.getDailyCalories(day));
      });
      return caloriesArray;
    },
  },
  mutations: {
    setDailyData(state, [key, value]) {
      state.periodData.set(key, value);

      const period = Object.fromEntries(state.periodData);

      state.periodData = sortDateMap(state.periodData);

      localStorage.setItem("periodData", JSON.stringify(period));
    },
    deleteDay(state, date) {
      state.periodData.delete(date);
      const period = Object.fromEntries(state.periodData);
      localStorage.setItem("periodData", JSON.stringify(period));
    },
    setPeriod(state, dateMap) {
      const sortedDateMap = sortDateMap(dateMap);
      state.periodData = sortedDateMap;
    },
  },
  actions: {
    setDailyData(context, [key, value]) {
      context.commit("setDailyData", [key, value]);
    },
    deleteDay(context, date) {
      context.commit("deleteDay", date);
    },
    setPeriod(context, dateMap) {
      context.commit("setPeriod", dateMap);
    },
  },

  sortDateMap,
};

export default periodDataModule;
