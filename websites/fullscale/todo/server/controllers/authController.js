import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  console.log(req.body);

  res.status(StatusCodes.CREATED).json({ data: req.body });
};

export const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logged in user" });
};

export const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "logged out user" });
};
