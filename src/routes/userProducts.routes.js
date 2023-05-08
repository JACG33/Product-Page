import { Router } from "express";
import { getStarts } from "../controllers/stars.controller.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";
const userRoutes = Router();

userRoutes.get("/", verifyLogedUser, async (req, res) => {
  try {
    const idUser = req.session.user;

    await User.sync();

    const userProdutcs = await Product.findAll({ where: { id_user: idUser } });

    const userInfo = await User.findOne({ where: { id_user: idUser } });

    // Cut descrip to return 80 characteres
    //
    userProdutcs.map(
      (userProdutc) =>
        (userProdutc.dataValues.descripCut = `${userProdutc.dataValues.descrip.slice(
          0,
          80,
          userProdutc.dataValues.descrip
        )}...`)
    );

    getStarts(userProdutcs);

    res.render("./user/profile.hbs", {
      title: `Busqueda`,
      loged: res.locals.userLogged,
      nav: true,
      userInfo: userInfo["dataValues"],
      userProducs: userProdutcs,
    });
  } catch (error) {
    console.log({ error });
  }
});

export default userRoutes;
