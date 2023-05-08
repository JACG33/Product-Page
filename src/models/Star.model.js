import { sequelize } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

class Star extends Model {}

Star.init(
  {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    id_product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    star_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Star",
    tableName: "stars",
  }
);

export { Star };
