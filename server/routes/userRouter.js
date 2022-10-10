/** @format */

import {Router} from "express";
import createUser from "../controllers/users/createUser.js";
import deleteUser from "../controllers/users/deleteUser.js";
import updateUser from "../controllers/users/updateUser.js";
import login from "../controllers/login.js";
import getUser from "../controllers/users/getUsers.js";
import cors from "cors";

const userRouter = new Router();

userRouter.get("/", getUser);
userRouter.post("/login", cors(), login);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/", deleteUser);

export default userRouter;
