import { Router } from "express";
import * as user from "../controllers/user.controller.js";

const userBack = Router();

userBack.get("/", user.getUsers)
userBack.patch("/", user.updateUser);


export { userBack };
