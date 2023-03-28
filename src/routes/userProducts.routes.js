import { Router } from "express";
import { pool } from "../db/db.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
const userRoutes = Router();

userRoutes.get("/", verifyLogedUser, async (req, res) => {
  try {
    const idUser = req.session.user;
    const userProdutcs = await pool.query(
      `SELECT * FROM products WHERE idUser="${idUser}"`
    );

    console.log(userProdutcs[0]);
    const resulStarts = await pool.query(
      "SELECT * FROM stars ORDER BY id_product ASC"
    );
    userProdutcs[0].forEach((prod) => {
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

    res.render("./user/profile.hbs", {
      title: `Busqueda`,
      loged: res.locals.userLogged,
      nav: true,
      userProducs: userProdutcs[0],
    });
  } catch (error) {
    console.log({ error });
  }
});

export default userRoutes;
