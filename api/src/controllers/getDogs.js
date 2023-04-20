require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");
//

const getDogs = async () => {
  const dogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  let dogAPI;
  await axios.get(`${API}/breeds/?api_key=${API_KEY}`).then((response) => {
    dogAPI = response.data;
  });
  if (dogs && dogs.length > 0) {
    const dogDB = dogs.map((dog) => ({
      id: dog.id,
      name: dog.name,
      image: dog.image,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperaments
        ? dog.temperaments.map((temp) => temp.name).join(", ")
        : [],
    }));
    return dogDB.concat(dogAPI);
  } else if (dogAPI) {
    return dogAPI;
  } else {
    throw new Error("Sin valores");
  }
};

module.exports = getDogs;
