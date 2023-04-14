const { Sequelize } = require("sequelize");
const { Dog } = require("../db");
const { Temperament } = require("../db");

const postDogs = async (
  name,
  image,
  height,
  weight,
  life_span,
  temperaments
) => {
  try {
    const createdDog = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
    });
    const foundTemperaments = await Temperament.findAll({
      where: {
        name: {
          [Sequelize.Op.in]: temperaments,
        },
      },
    });
    await createdDog.addTemperaments(foundTemperaments);
    await createdDog.save();
    return createdDog;
  } catch (error) {
    console.error(error);
  }
};

module.exports = postDogs;
