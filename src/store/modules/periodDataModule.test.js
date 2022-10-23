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
