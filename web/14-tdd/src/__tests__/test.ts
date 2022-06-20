const fn = require("../func.ts");

describe("multiply", () => {
  it("multiplication", () => {
    const params = [3, 10, 3];
    expect(fn.multiply(...params)).toEqual(90);
  });

  it("too many args", () => {
    const params = Array(31).fill(0);
    expect(() => {
      fn.multiply(...params);
    }).toThrowError("too many args");
  });

  it("include string", () => {
    const params = [3, 3, "text"];
    expect(() => {
      fn.multiply(...params);
    }).toThrowError("include string. this args only number");
  });

  it("over 1000", () => {
    const params = [1, 1000];
    expect(fn.multiply(...params)).toEqual("big big number");
  });
});

describe("add", () => {
  it("too many args", () => {
    const params = Array(31).fill(0);
    expect(() => {
      fn.multiply(...params);
    }).toThrowError("too many args");
  });

  it("include string", () => {
    const params = [3, 3, "text"];
    expect(() => {
      fn.multiply(...params);
    }).toThrowError("include string. this args only number");
  });
});
