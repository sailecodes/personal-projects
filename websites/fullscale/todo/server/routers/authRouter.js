import { Router } from "express";
import { register, login, logout } from "./../controllers/authController.js";

const authRouter = Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").get(logout);

export default authRouter;
