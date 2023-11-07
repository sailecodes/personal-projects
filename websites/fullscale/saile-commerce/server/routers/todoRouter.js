import { Router } from "express";

import { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";

const todoRouter = Router();

// Notes:
//  - Route information
//    - "/   " for getting all resources and creating a resource
//    - "/:id" for all else
//  - Restricted routes
//    - Every route must authenticate the user prior

todoRouter.route("/").get(getAllTodos).post(createTodo);
todoRouter.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

export default todoRouter;
