import { StatusCodes } from "http-status-codes";

export const getAllUsers = (req, res) => {
  res.status(StatusCodes.OK).send("Get all users");
};

export const createUser = (req, res) => {
  res.status(StatusCodes.CREATED).send("Create a user");
};

export const getUser = (req, res) => {
  res.status(StatusCodes.OK).send("Get a user");
};

export const updateUser = (req, res) => {
  res.status(StatusCodes.OK).send("Update a user");
};

export const deleteUser = (req, res) => {
  res.status(StatusCodes.OK).send("Delete a user");
};
