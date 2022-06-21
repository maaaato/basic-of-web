const getArgs = (process: any): number[] => {
  let args = [];
  for (var i = 0; i < process.argv.length; i++) {
    if (i > 2) {
      args.push(process.argv[i]);
    }
  }
  return args;
};

const threshold: number = 31;

const isOverArgs = (len: number, threshold: number): boolean => {
  if (len >= threshold) {
    return true;
  }
  return false;
};

export const multiply = (...args: number[]) => {
  if (isOverArgs(args.length, threshold)) {
    throw new Error("too many args");
  }

  let value: number = args.reduce((acc: number, current: number): number => {
    let v: number = Number(current);
    if (Number.isNaN(v)) {
      throw new Error("include string. this args only number");
    }
    return Number(acc) * v;
  });

  if (value >= 1000) {
    return "big big number";
  }

  return value;
};

export const add = (...args: number[]) => {
  if (isOverArgs(args.length, threshold)) {
    throw new Error("too many args");
  }

  let value: number = args.reduce((acc: number, current: number): number => {
    let v: number = Number(current);
    if (Number.isNaN(v)) {
      throw new Error("include string. this args only number");
    }
    return Number(acc) + v;
  });

  console.log(value);
  if (value >= 1000) {
    return "too big";
  }

  return value;
};

export const subtract = (...args: number[]) => {
  if (isOverArgs(args.length, threshold)) {
    throw new Error("too many args");
  }

  let value: number = args.reduce((acc: number, current: number): number => {
    let v: number = Number(current);
    if (Number.isNaN(v)) {
      throw new Error("include string. this args only number");
    }
    return Number(acc) - v;
  });

  if (value < 0) {
    return "negative number";
  }

  return value;
};

export const divide = (...args: number[]) => {
  if (isOverArgs(args.length, threshold)) {
    throw new Error("too many args");
  }

  let value: number = args.reduce((acc: number, current: number): number => {
    let v: number = Number(current);
    if (Number.isNaN(v)) {
      throw new Error("include string. this args only number");
    }
    return Number(acc) / v;
  });

  return value;
};

let v;
switch (process.argv[2]) {
  case "multiply":
    v = getArgs(process);
    console.log(multiply(...v));
    break;
  case "add":
    v = getArgs(process);
    console.log(add(...v));
    break;
  case "subtract":
    v = getArgs(process);
    console.log(subtract(...v));
    break;
  case "divide":
    v = getArgs(process);
    console.log(divide(...v));
    break;
  default:
    break;
}
