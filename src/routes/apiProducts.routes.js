import { Router } from "express";
import * as product from "../controllers/products.controller.js";
import { verifyToekn } from "../middlewares/verifyToken.js";
const apiRouter = Router();

apiRouter.get("/userProduct", product.getUserProduct);

apiRouter.get("/", product.getProducts);

apiRouter.get("/:id", product.getProduct);

apiRouter.post("/", verifyToekn, product.cretaeProduct);

apiRouter.patch("/", verifyToekn, product.updateProduct);

apiRouter.delete("/:id", verifyToekn, product.deleteProduct);

export default apiRouter;
