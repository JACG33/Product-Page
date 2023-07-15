import { Router } from "express";
import * as product from "../controllers/products.controller.js";
import { verifyToekn } from "../middlewares/verifyToken.js";
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
const apiProducts = Router();

apiProducts.get("/api/userProduct/", verifyLogedUser,product.getUserProduct);

apiProducts.get("/api/products/", verifyLogedUser,product.getProducts);

apiProducts.get("/api/products/:id", product.getProduct);

apiProducts.post("/api/products/", verifyToekn, product.cretaeProduct);

apiProducts.patch("/api/products/", verifyToekn, product.updateProduct);

apiProducts.delete("/api/products/:id", verifyToekn, product.deleteProduct);

export default apiProducts;
