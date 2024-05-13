import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createItem,
  idItem,
  updateItem,
} from "../validation/item-validation.js";
import { validate } from "../validation/validation.js";
import { nanoid } from "nanoid";
import { codeService, codePackService } from "../services/code-service.js";

const create = async (user, request) => {
  const item = validate(createItem, request);
  const brandCode = !item.brand ? "-" : item.brand;
  item.id = nanoid(10) + brandCode;
  item.username = user;

  !item.modal ? !item.code_modal : (item.code_modal = codeService(item.modal));

  !item.modal_pack
    ? !item.code_modal_pack
    : (item.code_modal_pack = codePackService(item.modal_pack));

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

const getAll = () => {
  return prismaClient.item.findMany({
    select: {
      name_item: true,
      price: true,
      brand: true,
      modal: true,
      modal_pack: true,
    },
  });
};

const update = async (user, request) => {
  const item = validate(updateItem, request);

  const cekItem = await prismaClient.item.count({
    where: {
      id: item.id,
    },
  });

  if (!cekItem) {
    throw new ResponseError(404, "item is not found");
  }

  item.username = user;

  !item.modal ? !item.code_modal : (item.code_modal = codeService(item.modal));

  if (!item.modal_pack) {
    !item.code_modal_pack;
  } else {
    item.modal_pack.toString().length >= 7
      ? (item.code_modal_pack = codePackService(item.modal_pack))
      : (item.code_modal_pack = codeService(item.modal_pack));
  }

  item.updated_at = new Date().toISOString();

  return prismaClient.item.update({
    where: {
      id: item.id,
    },
    data: item,
    select: {
      id: true,
      name_item: true,
      price: true,
      brand: true,
      username: true,
    },
  });
};

const detail = async (request) => {
  const cekId = validate(idItem, request);

  const countId = await prismaClient.item.count({
    where: {
      id: cekId,
    },
  });

  if (!countId) {
    throw new ResponseError(404, "item is not found");
  }

  return prismaClient.item.findUnique({
    where: {
      id: cekId,
    },
  });
};

const remove = async (request) => {
  const cekId = validate(idItem, request);

  const countId = await prismaClient.item.count({
    where: {
      id: cekId,
    },
  });

  if (!countId) {
    throw new ResponseError(404, "item is not found");
  }

  return prismaClient.item.delete({
    where: {
      id: cekId,
    },
    select: {
      id: true,
    },
  });
};

export default { create, getAll, update, detail, remove };
