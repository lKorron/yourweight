const sum = require("./sum");

test("sum of 2 numbers", () => {
  expect(sum(2, 3)).toBe(5);
});
