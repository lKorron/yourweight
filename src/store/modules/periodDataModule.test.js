import periodDataModule from "./periodDataModule";

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
    },
  ];

  testCases.forEach(({ foodList, expectedCalories }) => {
    it("shold return numeric value of calories", () => {
      const getDailyCalories = periodDataModule.getters.getDailyCalories;
      const state = {
        periodData: new Map([["04/04/22", foodList]]),
      };

      const calories = getDailyCalories(state)("04/04/22");

      expect(calories).toBe(expectedCalories);
    });
  });
});
