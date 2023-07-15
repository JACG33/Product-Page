import bcry from "bcryptjs";
import { nanoid } from "nanoid";
import { User } from "../models/User.model.js";
import { timeExpire } from "../config/session.manager.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../token/token.manager.js";

const login = async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;
    await User.sync();

    const getUser = await User.findOne({ where: { user: username } });
    if (!getUser) {
      console.log("error");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let passCompare = getUser["dataValues"].pass;
    let passHash = await bcry.compare(password, passCompare);

    if (!passHash)
      return res.status(401).json({ message: "Constraseña Incorrecta" });

    let { id_user, user, nombreApellido } = getUser["dataValues"];
    let accessToken = generateAccessToken({ id_user, user, nombreApellido });
    let refreshToken = generateRefreshToken(
      { id_user, user, nombreApellido },
      timeExpire
    );

    req.session.token = refreshToken;
    req.session.user = id_user;

    res.status(200).json({
      message: "Logeado",
      accessToken,
      refreshToken,
      userData: { id_user, user, nombreApellido },
      expireSession:
        new Date(Date.now()).getTime() + req.session.cookie.expires,
    });
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

const logut = async (req, res) => {
  try {
    console.log("logut+++++++++++++++++++++++++++++", req.headers);
    let { authorization } = req.headers;
    // sessionStore.destroy(authorization.split(" ")[1], (error) => {
    //   if (error) console.log(error);
    // });
    req.session.destroy();

    res.json({ message: "Out" });
  } catch (error) {
    console.log(error);
  }
};

export { login, register, logut };
