const getArgs = (process: any): number[] => {
  let args = [];
  for (var i = 0; i < process.argv.length; i++) {
    if (i > 2) {
      args.push(process.argv[i]);
    }
  }
  return args;
};

export const multiply = (...args: number[]) => {
  if (args.length >= 31) {
    throw new Error("too many args");
  }

  let value: number = args.reduce((acc: number, current: number): number => {
    console.log(typeof current);
    if (isNaN(current)) {
      throw new Error("include string. this args only number");
    }
    return acc * current;
  }, 1);

  if (value >= 1000) {
    return "big big number";
  }

  return value;
};

export const add = () => {
  console.debug("aaa");
};

// export const subtract = (hoge: number) => {
//   console.debug(hoge);
// };

export const divide = () => {
  console.debug("aaa");
};

switch (process.argv[2]) {
  case "multiply":
    let v = getArgs(process);
    console.log(v);
    console.log(multiply(...v));
    break;
  case "subtract":
  // subtract(process.argv[3]);
  default:
    break;
}
