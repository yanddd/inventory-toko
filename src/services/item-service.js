import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createItem } from "../validation/item-validation.js";
import { validate } from "../validation/validation.js";
import { nanoid } from "nanoid";

const create = async (user, request) => {
  const item = validate(createItem, request);
  item.id = nanoid(10) + item.brand;
  item.username = user;

  const code = ["x", "p", "e", "r", "f", "o", "l", "m", "a", "n"];

  const numwithdot = item.modal
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");

  const split = numwithdot.split(".");

  const splitSingle = split[0].split("");

  let hasilCode = "";

  splitSingle.forEach((c) => {
    hasilCode += code[c];
  });

  item.code_modal = hasilCode;

  const newItem = await prismaClient.item.create({
    data: item,
    select: {
      id: true,
      name_item: true,
      price: true,
      brand: true,
      username: true,
    },
  });

  return newItem;
};

export default { create };
