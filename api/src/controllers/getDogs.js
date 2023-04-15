require("dotenv").config();
const { API, API_KEY } = process.env;
const axios = require("axios");

const getDogs = () => {
  return axios.get(`${API}/breeds?api_key=${API_KEY}`).then((response) => {
    const dogs = response.data;
    if (dogs.length === 0) {
      throw new Error("sin valores");
    } else {
      return dogs;
    }
  });
};

module.exports = getDogs;
