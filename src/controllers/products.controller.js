import { pool } from "../db/db.js";

// Obtener todos los productos
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
const getProducts = async (req, res) => {
  try {
    const resul = await pool.query("SELECT * FROM products");
    starts(resul[0]);
    res.json(resul[0]);
  } catch (error) {
    console.log(error);
  }
};

// Obtener un producto
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const resul = await pool.query(
      "SELECT * FROM products WHERE id_product=?",
      [id]
    );

    if (!resul[0].length)
      return res.status(403).json({ message: "No se encontraron resultados" });
    starts(resul[0]);
    res.json(resul[0]);
  } catch (error) {
    console.log(error);
  }
};

// Obtener los productios de un Usuario
const getUserProduct = async (req, res) => {
  try {
    const user = req.session.user;
    const userProfile = await pool.query(
      "SELECT user FROM users WHERE idUser=?",
      [user]
    );
    const products = await pool.query("SELECT * FROM products WHERE idUser=?", [
      user,
    ]);

    if (!products[0].length) {
      return res.status(403).json({ message: "No se encontraron resultados" });
    }
    starts(products[0]);
    res.json({ userProfile: userProfile[0], products: products[0] });
  } catch (error) {}
};

// Crear un nuevo producto
const cretaeProduct = async (req, res) => {
  try {
    const { name, descrip } = req.body;
    const user = req.session.user;
    const resul = await pool.query(
      "INSERT INTO products(idUser,name,descrip) VALUES(?,?,?)",
      [user, name, descrip]
    );
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
    console.log(id, name, descrip);
    const resul = await pool.query(
      "UPDATE products SET name=?, descrip=? WHERE id_product=?",
      [name, descrip, id]
    );
    if (resul[0].affectedRows === 0)
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
    const resul = await pool.query("DELETE FROM products WHERE id_product=?", [
      id,
    ]);

    const deleteStart = await pool.query(
      "DELETE FROM stars WHERE id_product=?",
      [id]
    );
    if (resul[0].affectedRows === 0)
      return res.status(403).json({ message: "No se encontraron Datos" });
    res.json({ message: "Datos elimiados" });
    // res.json(resul[0]);
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
