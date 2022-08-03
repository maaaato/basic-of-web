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
  it("add", () => {
    const params = [10, 10, 10];
    expect(fn.add(...params)).toEqual(30);
  });
  it("too many args", () => {
    const params = Array(31).fill(0);
    expect(() => {
      fn.add(...params);
    }).toThrowError("too many args");
  });

  it("include string", () => {
    const params = [3, 3, "text"];
    expect(() => {
      fn.add(...params);
    }).toThrowError("include string. this args only number");
  });

  it("too big", () => {
    const params = [999, 2];
    expect(fn.add(...params)).toEqual("too big");
  });
});

describe("subtract", () => {
  it("too many args", () => {
    const params = Array(31).fill(0);
    expect(() => {
      fn.subtract(...params);
    }).toThrowError("too many args");
  });

  it("include string", () => {
    const params = [3, 3, "text"];
    expect(() => {
      fn.subtract(...params);
    }).toThrowError("include string. this args only number");
  });

  it("negative number", () => {
    const params = [1, 1, 1];
    expect(fn.subtract(...params)).toEqual("negative number");
  });
});

describe("divide", () => {
  it("divide", () => {
    const params = [100, 10];
    expect(fn.divide(...params)).toEqual(10);
  });
  it("too many args", () => {
    const params = Array(31).fill(0);
    expect(() => {
      fn.divide(...params);
    }).toThrowError("too many args");
  });

  it("include string", () => {
    const params = [3, 3, "text"];
    expect(() => {
      fn.divide(...params);
    }).toThrowError("include string. this args only number");
  });
});
