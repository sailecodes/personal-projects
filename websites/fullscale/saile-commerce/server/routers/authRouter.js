import { Router } from "express";

import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

const authRouter = Router();

authRouter.route("/register").post(validateRegisterInput, register);
authRouter.route("/login").post(validateLoginInput, login);
authRouter.route("/logout").get(logout);

export default authRouter;
