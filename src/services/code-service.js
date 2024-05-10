export const codeService = (number) => {
  const code = ["x", "p", "e", "r", "f", "o", "l", "m", "a", "n"];

  const numwithdot = number
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");

  const split = numwithdot.split(".");

  const splitSingle = split[0].split("");

  let hasilCode = "";

  splitSingle.forEach((c) => {
    hasilCode += code[c];
  });

  return hasilCode;
};

export const codePackService = (number) => {
  const code = ["x", "p", "e", "r", "f", "o", "l", "m", "a", "n"];

  const numwithdot = number
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");

  const split = numwithdot.split(".");

  const mergeArray = split[0].concat(split[1]);

  const splitSingle = mergeArray.split("");

  let hasilCode = "";

  splitSingle.forEach((c) => {
    hasilCode += code[c];
  });

  return hasilCode;
};
