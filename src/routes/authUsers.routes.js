import { Router } from "express";
import { login, register } from "../controllers/auth.constroller.js";
const authRouter = Router();


authRouter.get("/logut", (req, res) => {
  req.session.destroy()
  res.redirect("/login");
});

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
