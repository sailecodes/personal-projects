import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import userModel from "../models/userModel.js";
import { UnauthenticatedError } from "../custom-errors/customErrors.js";
import { COOKIE_EXPIRATION } from "../utils/constants.js";

export const register = async (req, res) => {
  // Creates a hashed, irreversible password to store in the database
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = await userModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "Server message: registered user." });
};

export const login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw new UnauthenticatedError("Invalid credentials.");
  }

  // Creates a JSON web token
  const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  // Creates a cookie with an embedded JSON for authentication in the restricted routes
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + COOKIE_EXPIRATION),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).send({ msg: "Server message: logged in user." });
};

export const logout = async (req, res) => {
  // Clears the cookie (i.e. removes the JWT)
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Server message: logged out user." });
};
