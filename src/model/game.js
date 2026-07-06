const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../db");
const sequelizeInstance = dbConnect.Sequelize;
class Game extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    na_sales: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    eu_sales: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    jp_sales: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    other_sales: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    global_sales: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "games",
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = Game;
