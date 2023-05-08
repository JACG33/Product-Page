import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize };
