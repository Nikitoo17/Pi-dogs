require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Temperament } = require("../db");

const getTemperaments = async () => {
  return await axios
    .get(`${API}/breeds?api_key=${API_KEY}`)
    .then(async (response) => {
      const temperaments = response.data.map((temp) => ({
        name: temp.temperament || "Desconocido",
      }));
      const validTemperaments = temperaments.filter(
        (temp) => temp.temperaments !== null && temp.temperaments !== ""
      );
      if (validTemperaments.length === 0) {
        throw new Error("Don´t exist valid temperaments");
      } else {
        await Temperament.bulkCreate(validTemperaments);
        return validTemperaments;
      }
    });
};

module.exports = getTemperaments;
