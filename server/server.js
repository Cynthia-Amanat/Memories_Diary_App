import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import session from "express-session";
import userRouter from "./routes/userRouter.js";
import memoryRouter from "./routes/memoryRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
// Make sure to update the secret code variable when declaring the session function as it will used to secure the session data. We'll be using sessions to determine whether the user is logged-in or not.
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// My Routes

app.use("/user", cors(), userRouter);
app.use("/memory", cors(), memoryRouter);

// Connect to database
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
