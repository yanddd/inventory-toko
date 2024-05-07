import express from "express";
import userController from "../controller/user-controller.js";
import categoryCotroller from "../controller/category-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

export const userRouter = new express.Router();
userRouter.use(authMiddleware);

// user
userRouter.get("/api/users", userController.getUser);
userRouter.patch("/api/users", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// category
userRouter.post("/api/category", categoryCotroller.create);
userRouter.get("/api/category", categoryCotroller.get);
