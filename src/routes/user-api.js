import express from "express";
import userController from "../controller/user-controller.js";
import categoryCotroller from "../controller/category-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import itemController from "../controller/item-controller.js";

export const userRouter = new express.Router();
userRouter.use(authMiddleware);

// user
userRouter.get("/api/users", userController.getUser);
userRouter.patch("/api/users", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// category
userRouter.post("/api/category", categoryCotroller.create);
userRouter.get("/api/category", categoryCotroller.get);
userRouter.put("/api/category/:idCategory", categoryCotroller.update);
userRouter.delete("/api/category/:idCategory", categoryCotroller.remove);

// item
userRouter.post("/api/item", itemController.create);
userRouter.get("/api/item", itemController.getAll);
userRouter.put("/api/item/:itemId", itemController.update);
userRouter.get("/api/item/:itemId", itemController.detail);
userRouter.delete("/api/item/:itemId", itemController.remove);
