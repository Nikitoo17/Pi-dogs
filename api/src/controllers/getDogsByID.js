require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogsByID = async (id) => {
  const isUUID = (id) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };
  let dog;
  let dogAPI;
  if (isUUID(id)) {
    dog = await Dog.findByPk(id, {
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  } else {
    await axios
      .get(`${API}/breeds/${id}?api_key=${API_KEY}`)
      .then((response) => {
        dogAPI = response.data;
      });
  }

  if (dog && dogAPI) {
    const dogDB = {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperaments.map((temp) => temp.name),
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
      temperament: dog.temperaments.map((temp) => temp.name),
    };
    return dogDB;
  } else if (!dog) {
    return dogAPI;
  } else {
    throw new Error("No se encontro el Perro");
  }
};

module.exports = getDogsByID;
