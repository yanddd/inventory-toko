import itemService from "../services/item-service.js";

const create = async (req, res, next) => {
  try {
    const result = await itemService.create(req.user.username, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await itemService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id = req.params.itemId;
    const result = await itemService.update(req.user.username, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const detail = async (req, res, next) => {
  try {
    const result = await itemService.detail(req.params.itemId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next();
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await itemService.remove(req.params.itemId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, update, detail, remove };
