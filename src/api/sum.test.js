const sum = require("./sum");

test("sum of 2 numbers", () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3);
});

const promise = new Promise((resolve, reject) => resolve(3));

describe("lol", () => {
  test("should End of string g", async () => {
    const res = await promise;
    expect(res).toBe(2);
  });
});
