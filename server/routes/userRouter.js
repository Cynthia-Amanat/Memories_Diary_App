import { Router } from "express";
import createUser from "../controllers/users/createUser.js";
import deleteUser from "../controllers/users/deleteUser.js";
import updateUser from "../controllers/users/updateUser.js";
import login from "../controllers/login.js";
import getUser from "../controllers/users/getUsers.js";

const userRouter = new Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.post("/login", login);
// userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);

export default userRouter;
