const load = require("./load");
let callback;
let errorHandler;

beforeAll(() => {
  callback = jest.fn();
  errorHandler = jest.fn();
});

describe("api: load", () => {
  it("should be called", () => {
    load(callback, errorHandler);

    expect(callback.mock.calls.length).toBe(1);
    expect(errorHandler.mock.calls.length).toBe(0);
  });

  it("should catch errors with handler", () => {
    load(() => {
      throw new Error("error");
    }, errorHandler);

    expect(callback.mock.calls.length).toBe(1);
    expect(errorHandler.mock.calls.length).toBe(1);
  });

  it("should catch errors without handler", () => {
    console.log = jest.fn();

    load(() => {
      throw new Error("something wrong");
    });

    expect(console.log).toHaveBeenNthCalledWith(1, "error");
    expect(console.log).toHaveBeenLastCalledWith(new Error("something wrong"));
  });
});
