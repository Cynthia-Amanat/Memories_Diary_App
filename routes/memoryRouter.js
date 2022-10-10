/** @format */

import {Router} from "express";
import createMemory from "../controllers/Memories/createMemories.js";
import getMemories from "../controllers/Memories/getMemories.js";
import updateMemory from "../controllers/Memories/updateMemory.js";
import deleteMemory from "../controllers/Memories/deleteMemory.js";
import multer from "multer";

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const memoryRouter = new Router();

memoryRouter.get("/:userID", getMemories);
memoryRouter.post("/", upload.single("image"), createMemory);
memoryRouter.put("/:id", updateMemory);
memoryRouter.delete("/", deleteMemory);

export default memoryRouter;
