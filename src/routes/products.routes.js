import { Router } from "express";
import { pool } from "../db/db.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
const routerProducts = Router();

const starts = async (params) => {
  const resulStarts = await pool.query(
    "SELECT * FROM stars ORDER BY id_product ASC"
  );
  params.forEach((prod) => {
    let tempStart = 0;
    let countStart = 0;
    resulStarts[0].forEach((start) => {
      if (prod.id_product == start.id_product) {
        tempStart += start.star_num;
        countStart++;
      }
    });
    let rating = tempStart / countStart;
    prod.rating = rating ? Number(rating.toFixed(2)) : 0;
  });
};

routerProducts.get("/", verifyLogedUser, async (req, res) => {
  try {
    const query = await pool.query(`SELECT * FROM products `);

    starts(query[0]);
    // res.json(search[0]);
    res.render("./products/products.hbs", {
      title: `Productos`,
      loged: res.locals.userLogged,
      nav: true,
      resulProducts: query[0],
    });
  } catch (error) {
    console.log({ error });
  }
});

export default routerProducts;
