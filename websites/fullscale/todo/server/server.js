import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import * as dotenv from "dotenv";

import authRouter from "./routers/authRouter.js";

// ----- INIT

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// ----- MIDDLEWARE

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ----- R0UTES
// Note(s):
//  - BASE URL: domain/api/v1

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("Home route");
});

app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route not found" });
});

// TODO: add error handler middleware

// ----- SERVER INIT

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
