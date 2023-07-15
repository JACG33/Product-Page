import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-04:00",
});

export { sequelize };
