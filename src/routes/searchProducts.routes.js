import { Router } from "express";
import { pool } from "../db/db.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
const search = Router();

search.get("/:producto", verifyLogedUser, async (req, res) => {
  try {
    const { producto } = req.params;

    if (!producto) res.render("./products/products.hbs");

    const search = await pool.query(
      `SELECT * FROM products WHERE name LIKE "%${producto}%"`
    );

    const resulStarts = await pool.query(
      "SELECT * FROM stars ORDER BY id_product ASC"
    );
    search[0].forEach((prod) => {
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

    res.render("./products/search.products.hbs", {
      title: `Busqueda para ${producto}`,
      nav: true,
      loged: res.locals.userLogged,
      resulSearch: search[0],
    });
  } catch (error) {
    console.log({ error });
  }
});
search.get("/", async (req, res) => {
  res.redirect("/products");
});

export default search;
