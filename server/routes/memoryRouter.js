import { Router } from "express";
import createMemory from "../controllers/Memories/createMemories.js";
import getMemories from "../controllers/Memories/getMemories.js";
import updateMemory from "../controllers/Memories/updateMemory.js";
import deleteMemory from "../controllers/Memories/deleteMemory.js";

const memoryRouter = new Router();

memoryRouter.get("/", getMemories);
memoryRouter.post("/", createMemory);
memoryRouter.put("/", updateMemory);
memoryRouter.delete("/", deleteMemory);

export default memoryRouter;
