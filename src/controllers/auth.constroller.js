import bcry from "bcryptjs";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const login = async (req, res) => {
  try {
    const {
      body: { user, password },
    } = req;
    await User.sync();

    const getUser = await User.findOne({ where: { user: user } });
    if (!getUser) {
      console.log("error");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let passCompare = getUser["dataValues"].pass;
    let passHash = await bcry.compare(password, passCompare);

    if (!passHash)
      return res.status(401).json({ message: "Constraseña Incorrecta" });

    let token = jwt.sign(
      { jwToken: getUser["dataValues"].id_user },
      "topScret"
    );
    let idUser = getUser["dataValues"].id_user;
    req.session.token = token;
    req.session.user = idUser;
    res.json({ message: "Logeado" });
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    const {
      body: { fullname, user, password },
    } = req;
    let idUser = nanoid(10);
    let passHash = await bcry.hash(password, 8);

    await User.sync();
    const createUser = await User.create({
      id_user: idUser,
      user: user,
      nombreApellido: fullname,
      pass: passHash,
    });

    if (!createUser)
      return res.status(403).json({ message: "Erro en los datos" });
    res.status(203).json({ message: "Usuario registrado" });
  } catch (error) {
    console.log(error);
  }
};

const loginView = (req, res) => {
  if (req.session.token) return res.redirect("/products");

  res.render("./auth/login.hbs", { nav: false });
};
const registerView = (req, res) => {
  if (req.session.token) return res.redirect("/products");
  res.render("./auth/register.hbs", { nav: false });
};

export { login, register, loginView, registerView };
