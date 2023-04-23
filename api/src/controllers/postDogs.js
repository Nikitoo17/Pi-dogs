const { Sequelize } = require("sequelize");
const { Dog } = require("../db");
const { Temperament } = require("../db");

const postDogs = async (
  name,
  image,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  life_span,
  temperaments
) => {
  try {
    const createdDog = await Dog.create({
      name,
      image,
      height: `${heightMin} - ${heightMax} `,
      weight: `${weightMin} - ${weightMax} `,
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
