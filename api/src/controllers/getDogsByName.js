require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");

const getDogsByName = async (name) => {
  name = name.toLowerCase();
  return await axios
    .get(`${API}/breeds?api_key=${API_KEY}`)
    .then((response) => {
      const dogs = response.data.filter((dog) => {
        return dog.name.toLowerCase().includes(name);
      });
      if (dogs.length === 0) {
        throw new Error(`No se encontraron perros de la raza ${name}`);
      } else {
        return dogs;
      }
    });
};

module.exports = getDogsByName;
