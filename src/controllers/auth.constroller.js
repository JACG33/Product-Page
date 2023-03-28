import bcry from "bcryptjs";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";

const login = async (req, res) => {
  try {
    const {
      body: { user, password },
    } = req;
    const query = await pool.query("SELECT * FROM users WHERE user=?", [user]);
    if (!query)
      return res.status(401).json({ message: "Usuario no encontrado" });
    let passHash = await bcry.compare(password, query[0][0].pass);
    if (!passHash)
      return res.status(401).json({ message: "Constraseña Incorrecta" });
    let token = jwt.sign({ jwToken: query[0][0].idUser }, "topScret");
    let idUser = query[0][0].idUser;
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
    const query = await pool.query(
      "INSERT INTO users(idUser,user,nombreApellido,pass) VALUES(?,?,?,?)",
      [idUser, user, fullname, passHash]
    );
    if (!query) return res.status(403).json({ message: "Erro en los datos" });
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
