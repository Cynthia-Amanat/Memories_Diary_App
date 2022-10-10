/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import memoryRouter from "./routes/memoryRouter.js";
import fs from "fs";
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

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
// app.use(express.urlencoded({extended: false}));

// My Routes

app.use("/user", cors(), userRouter);
app.use("/memory", cors(), memoryRouter);

app.post("/image", upload.single("image"), (req, res, next) => {
  // const url = req.protocol + "://" + req.get("host");
  // const name = url + "/public/" + req.file.filename;
  const newImage = fs.readFileSync("public/" + req.file.filename);

  console.log(newImage);
});

// Connect to database
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
