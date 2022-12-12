/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import memoryRouter from "./routes/memoryRouter.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import {fileURLToPath} from "url";

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

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// My Routes
app.use("/user", cors(), userRouter);
app.use("/memory", cors(), memoryRouter);

app.post("/image", upload.single("image"), (req, res, next) => {
  const newImage = fs.readFileSync("public/" + req.file.filename);
});

// Connect to database

const PORT = process.env.PORT || 7000;
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => console.log("database connected"))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("cilent/build"));
  app.get("*", (req, res) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    res.sendFile(path.resolve(__dirname, "cilent", "build", "index.html"));
  });
}
