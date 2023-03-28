import { Router } from "express";
import { pool } from "../db/db.js";

const starsRouter = Router();

starsRouter.get("/", async (req, res) => {
  try {
    const resul = await pool.query(
      "SELECT * FROM stars ORDER BY id_product ASC"
    );

    res.json({ message: resul[0] });
  } catch (error) {}
});

starsRouter.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const {
      body: { data, id },
    } = req;
    const user = req.session.user;
    const sol = await pool.query(
      "INSERT INTO stars (id_product,star_num) VALUES(?,?)",
      [id, data]
    );

    res.json({ message: "Stars Create" });
  } catch (error) {
    console.log({ error });
  }
});

starsRouter.patch("/id", (req, res) => {});

starsRouter.delete("/:id", (req, res) => {});

export default starsRouter;
