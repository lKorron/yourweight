import api from "./index";

describe("api: nutriens", () => {
  const testCases = [
    {
      name: "milk",
    },
    {
      name: "dal",
    },
    {
      name: "water",
    },
  ];

  testCases.forEach((testCase) => {
    it("should return correct info", async () => {
      const res = await api.nutritionix.nutriens(testCase.name);

      const { food_name, nf_calories, serving_unit } = res.data.foods[0];

      expect(food_name).toBe(testCase.name.toLowerCase());
      expect(typeof nf_calories).toBe("number");
      expect(typeof serving_unit).toBe("string");
    });
  });
});

describe("api: search", () => {
  const testCases = [
    {
      searchString: "milk",
    },
    {
      searchString: "cof",
    },
    {
      searchString: "a",
    },
    {
      searchString: "adsa",
    },
  ];

  testCases.forEach((testCase) => {
    it("shold return search list", async () => {
      const response = await api.nutritionix.search(testCase.searchString);

      const list = response.data.common;

      expect(list).toBeInstanceOf(Array);
    });
  });
});
