import { StatusCodes } from "http-status-codes";

export const getAllTodos = async (req, res) => {
  res.status(StatusCodes.OK).send("get all todos");
};

export const createTodo = async (req, res) => {
  res.status(StatusCodes.OK).send("create todo");
};

export const getTodo = async (req, res) => {
  res.status(StatusCodes.OK).send("get a todo");
};

export const updateTodo = async (req, res) => {
  res.status(StatusCodes.OK).send("update a todo");
};

export const deleteTodo = async (req, res) => {
  res.status(StatusCodes.OK).send("delete a todo");
};
