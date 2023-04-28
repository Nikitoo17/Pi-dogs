require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async () => {
  const temps = Temperament.findAll();
  if (temps.length) {
    return temps;
  }
  return await axios
    .get(`${API}/breeds?api_key=${API_KEY}`)
    .then(async (response) => {
      const temperaments = response.data.flatMap((temperament) => {
        if (!temperament.temperament) {
          return { name: "Desconocido" };
        }
        return temperament.temperament.split(",").map((temp) => ({
          name: temp.trim(),
        }));
      });
      const uniqueTemperaments = [
        ...new Set(temperaments.map((temp) => temp.name)),
      ];
      const validTemperaments = uniqueTemperaments
        .filter((temp) => temp !== "Desconocido")
        .map((temp) => ({ name: temp }));
      if (validTemperaments.length === 0) {
        throw new Error("Don't exist valid temperaments");
      } else {
        const createdTemperaments = [];
        for (const temp of validTemperaments) {
          const [created, _] = await Temperament.findOrCreate({
            where: { name: temp.name },
            defaults: { name: temp.name },
          });
          createdTemperaments.push(created);
        }
        return createdTemperaments;
      }
    });
};

module.exports = getTemperaments;
