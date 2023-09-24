import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import morgan from "morgan";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error: ", err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

import usersRouter from "./routes/users.js";

//All routers (middleware) will be placed here
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
