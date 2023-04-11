require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");

const getDogsByID = async (id) => {
  return await axios
    .get(`${API}/breeds/${id}?api_key=${API_KEY}`)
    .then((response) => {
      const dog = response.data;
      if (!dog) {
        throw new Error("No se encontro el Perro");
      } else {
        return dog;
      }
    });
};

module.exports = getDogsByID;
