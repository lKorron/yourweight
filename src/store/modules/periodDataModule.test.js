import periodDataModule from "./periodDataModule";
import moment from "moment";

describe("sortDateMap", () => {
  const testCases = [
    {
      initialDates: [
        ["18/09/24", "one"],
        ["15/03/24", "two"],
        ["01/03/30", "three"],
      ],
      expectedDates: [
        ["15/03/24", "two"],
        ["18/09/24", "one"],
        ["01/03/30", "three"],
      ],
    },
    {
      initialDates: [
        ["01/03/30", "three"],
        ["11/09/24", "two"],
        ["10/09/24", "one"],
        ["01/03/30", "four"],
      ],
      expectedDates: [
        ["10/09/24", "one"],
        ["11/09/24", "two"],
        ["01/03/30", "three"],
        ["01/03/30", "four"],
      ],
    },
  ];

  testCases.forEach((testCase) => {
    it("shold sort map by string dates", () => {
      const sortDateMap = periodDataModule.sortDateMap;

      const initialMap = new Map(testCase.initialDates);

      const expectedMap = new Map(testCase.expectedDates);

      const sortedMap = sortDateMap(initialMap);

      expect(Array.from(sortedMap)).toEqual(Array.from(expectedMap));
    });
  });
});

describe("getDailyCalories", () => {
  const testCases = [
    {
      foodList: [{ calories: 500 }, { calories: 600 }],
      expectedCalories: 1100,
      date: "04/04/22",
    },
    {
      foodList: [{ calories: 543 }, { calories: 621 }, { calories: 773 }],
      expectedCalories: 1937,
      date: "09/03/12",
    },
    {
      foodList: [{ calories: 20.7 }, { calories: 400 }, { calories: 115.8 }],
      expectedCalories: 536.5,
      date: "25/03/32",
    },
    {
      foodList: [{ calories: 200.1 }, { calories: 300.2 }],
      expectedCalories: 500.3,
      date: "05/11/18",
    },
  ];

  testCases.forEach(({ foodList, expectedCalories, date }) => {
    it("shold return numeric value of calories", () => {
      const getDailyCalories = periodDataModule.getters.getDailyCalories;
      const state = {
        periodData: new Map([[date, foodList]]),
      };

      const calories = getDailyCalories(state)(date);

      expect(calories).toBeCloseTo(expectedCalories);
    });
  });
});

describe("getTodayData", () => {
  const testCases = [
    {
      value: "data",
      date: moment().format("DD/MM/YYYY"),
    },
    {
      value: [1, 2, 3],
      date: moment().format("DD/MM/YYYY"),
    },
    {
      value: [1, 2, 3],
      date: "02/09/22",
    },
    {
      value: { data: "data" },
      date: "02/09/22",
    },
  ];

  testCases.forEach(({ value, date }) => {
    it("should return new Map with today data or null", () => {
      const getTodayData = periodDataModule.getters.getTodayData;

      const state = { periodData: new Map([[date, value]]) };

      const todayMap = getTodayData(state);

      let expectedMap;
      if (date !== moment().format("DD/MM/YYYY")) {
        expectedMap = null;
      } else expectedMap = new Map([[date, value]]);

      expect(todayMap).toEqual(expectedMap);
    });
  });
});
