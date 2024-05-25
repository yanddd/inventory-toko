import hutangService from "../services/hutang-service.js";

const create = async (req, res, next) => {
  try {
    const result = await hutangService.create(req.user.username, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createWithId = async (req, res, next) => {
  try {
    req.body.id_hutang = req.params.idHutang;
    const result = await hutangService.createWithId(
      req.user.username,
      req.body
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await hutangService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const detail = async (req, res, next) => {
  try {
    const result = await hutangService.detail(req.params.idHutang);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    const result = await hutangService.update(req.user.username, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await hutangService.remove(req.params.id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, createWithId, getAll, detail, update, remove };
