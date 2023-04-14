const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Temperament = sequelize.define(
    "temperament",
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
  return Temperament;
};
