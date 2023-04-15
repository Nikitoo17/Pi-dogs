require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Dog } = require("../db");
const getDogs = require("./getDogs");

const getDogsByName = async (name) => {
  if (name === "") {
    return getDogs();
  }
  const dogsDB = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  const dogsAPI = await axios
    .get(`${API}/breeds/search?q=${name}&api_key=${API_KEY}`)
    .then((response) => response.data);

  const dogs = dogsDB.concat(dogsAPI);

  if (dogs.length === 0) {
    throw new Error(
      "No se encontraron razas de perros que coincidan con la búsqueda."
    );
  } else {
    return dogs;
  }
};

module.exports = getDogsByName;
