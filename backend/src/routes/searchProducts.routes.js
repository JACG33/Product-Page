import { Router } from "express";
import { Op } from "sequelize";
import { Product } from "../models/Product.model.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
import { getStarts } from "../controllers/stars.controller.js";
const search = Router();


search.get("/:producto", verifyLogedUser, async (req, res) => {
  try {
    const { producto } = req.params;

    if (!producto) res.render("./products/products.hbs");

    const search = await Product.findAll({
      where: {
        name: {
          [Op.like]: `${producto}%`,
        },
      },
    });

    getStarts(search);

    res.render("./products/search.products.hbs", {
      title: `Busqueda para ${producto}`,
      nav: true,
      loged: res.locals.userLogged,
      resulSearch: search,
    });
  } catch (error) {
    console.log({ error });
  }
});

search.get("/s/:producto", async (req, res) => {
  try {
    const { producto } = req.params;
    console.log(producto);
    if (!producto) return res.json({ messa: "Sin datos" });

    const search = await Product.findAll({
      where: {
        name: {
          [Op.like]: `${producto}%`,
        },
      },
    });
    console.log(search);
    let resul = search.map((ele) => ({ name: ele.dataValues["name"] }));
    res.json(resul);
  } catch (error) {
    console.log({ Error: error });
  }
});

export default search;
