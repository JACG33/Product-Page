import { Router } from "express";
import { login, logut, register } from "../controllers/auth.constroller.js";
const authRouter = Router();

authRouter.delete("/api/auth/logut", logut);
authRouter.post("/api/auth/login", login);
authRouter.post("/api/auth/register", register);

export default authRouter;
