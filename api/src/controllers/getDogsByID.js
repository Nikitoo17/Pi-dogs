require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogsByID = async (id) => {
  const dog = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  let dogAPI;
  await axios.get(`${API}/breeds/${id}?api_key=${API_KEY}`).then((response) => {
    dogAPI = response.data;
  });
  if (dog && dogAPI) {
    const dogDB = {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperaments: dog.temperaments.map((temp) => temp.name),
    };
    return { dogDB, dogAPI };
  } else if (!dogAPI) {
    const dogDB = {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperaments: dog.temperaments.map((temp) => temp.name),
    };
    return dogDB;
  } else if (!dog) {
    return dogAPI;
  } else {
    throw new Error("No se encontro el Perro");
  }
};

module.exports = getDogsByID;
