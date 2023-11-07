import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";

export const register = async (req, res) => {
  // Creates a hashed, irreversible password to store in the database
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = await userModel.create(req.body);

  res.status(StatusCodes.CREATED).send();
};

export const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logged in user" });
};

export const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logged out user" });
};
