const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Temperaments = sequelize.define(
    "temperaments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Temperaments;
};
