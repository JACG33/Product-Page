import { Router } from "express";
import { getStarts } from "../controllers/stars.controller.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
import {Product} from "../models/Product.model.js";
const routerProducts = Router();

routerProducts.get("/", verifyLogedUser, async (req, res) => {
  try {
    await Product.sync()
    
    const query= await Product.findAll();

    await getStarts(query);
    
    res.render("./products/products.hbs", {
      title: `Productos`,
      loged: res.locals.userLogged,
      nav: true,
      resulProducts: query,
    });
  } catch (error) {
    console.log({ error });
  }
});

export default routerProducts;
