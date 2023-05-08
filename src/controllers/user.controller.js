import { User } from "../models/User.model.js";

const getUsers = async (req, res) => {
  try {
   await User.sync();
    const query = await User.findAll();
    res.json(query)
  } catch (error) {}
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = req.session.user;
    const query = await pool.query(
      "UPDATE users SET nombreApellido=? WHERE idUser=?",
      [username, user]
    );
    console.log(query[0]);

    res.json({ message: "Usuario Actualizado" });
  } catch (error) {
    console.log({ error });
  }
};

export { updateUser, getUsers };
