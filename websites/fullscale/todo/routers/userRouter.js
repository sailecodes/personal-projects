import express from "express";

import { getAllUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/userControllers.js";

/**
 * Notes:
 *  - BASE-URL: .../api/v1
 *  - CRUD routes:
 *    - GET ALL USERS: .../api/v1/user
 *    - CREATE A USER: .../api/v1/user
 *    -    GET A USER: .../api/v1/user/:id
 *    - UPDATE A USER: .../api/v1/user/:id
 *    - DELETE A USER: .../api/v1/user/:id
 */

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

export default router;
