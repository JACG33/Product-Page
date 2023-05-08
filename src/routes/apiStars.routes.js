import { Router } from "express";
import { Star } from "../models/Star.model.js";

const starsRouter = Router();

starsRouter.get("/", async (req, res) => {
  try {
    await Star.sync();

    const getStars = await Star.findAll();

    res.json({ message: getStars });
  } catch (error) {}
});

starsRouter.post("/", async (req, res) => {
  try {
    const {
      body: { data, id },
    } = req;

    const user = req.session.user;

    await Star.sync();

    const create = await Star.create({
      id_product: id,
      id_user: user,
      star_number: data,
    });

    res.json({ message: "Stars Create" });
  } catch (error) {
    console.log({ error });
  }
});

starsRouter.patch("/id", (req, res) => {});

starsRouter.delete("/:id", (req, res) => {});

export default starsRouter;
