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

export default { create };
