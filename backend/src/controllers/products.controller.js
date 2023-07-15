import { Product } from "../models/Product.model.js";
import { getStarts } from "./stars.controller.js";
import { Star } from "../models/Star.model.js";

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    await Product.sync();
    const getProducts = await Product.findAll();
    await getStarts(getProducts);
    res.json(getProducts);
  } catch (error) {
    console.log(error);
  }
};

// Obtener un producto
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.sync();

    const getProduct = await Product.findAll({
      where: {
        id_product: id,
      },
    });

    if (!getProduct.length)
      return res.status(403).json({ message: "No se encontraron resultados" });
    await getStarts(getProduct);
    res.json(getProduct);
  } catch (error) {
    console.log(error);
  }
};

// Obtener los productios de un Usuario
const getUserProduct = async (req, res) => {
  try {
    const user = req.session.user;

    if(!user)return res.json({message:"unauthorize"})

    console.log("++++++++++++++++++++getting++++++++++++++++++++++", user);
    // await Product.sync();

    const userProducts = await Product.findAll({
      where: {
        id_user: user,
      },
    });

    userProducts.map(
      (userProdutc) =>
        (userProdutc.dataValues.descripCut = `${userProdutc.dataValues.descrip.slice(
          0,
          80,
          userProdutc.dataValues.descrip
        )}...`)
    );

    //if (!userProducts[0].length) {
    //return res.status(403).json({ message: "No se encontraron resultados" });
    //}
    await getStarts(userProducts);
    res.json(userProducts );
  } catch (error) {}
};

// Crear un nuevo producto
const cretaeProduct = async (req, res) => {
  try {
    const { name, descrip } = req.body;
    const user = req.session.user;

    await Product.sync();

    const createProduct = await Product.create({
      id_user: user,
      name: name,
      descrip: descrip,
    });
    res.json({ message: "Producto añadido" });
  } catch (error) {
    console.log(error);
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const {
      body: { id, name, descrip },
    } = req;

    await Product.sync();

    const resul = await Product.update(
      { name: name, descrip: descrip },
      { where: { id_product: id } }
    );

    console.log(resul);
    if (!resul)
      return res.status(403).json({ message: "No se encontraron Datos" });
    res.json({ message: "Datos actualizados" });
  } catch (error) {
    console.log(error);
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.sync();

    await Star.sync();

    const deleteResult = await Product.destroy({
      where: {
        id_product: id,
      },
    });

    const deleteStart = await Star.destroy({
      where: {
        id_product: id,
      },
    });

    if (deleteResult.affectedRows === 0)
      return res.status(403).json({ message: "No se encontraron Datos" });

    res.json({ message: "Datos elimiados" });
  } catch (error) {
    console.log(error);
  }
};

export {
  getProducts,
  cretaeProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getUserProduct,
};
