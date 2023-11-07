import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

import userRouter from "./routers/userRouter.js";

// ----- INIT

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;

// ----- MIDDLEWARE

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

// ----- R0UTES
// Note(s):
//  - BASE URL: domain/api/v1

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("Hi clarisse");
});

app.use("/api/v1/user", userRouter);

// ----- SERVER INIT

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
