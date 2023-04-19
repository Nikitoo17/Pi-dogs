import axios from "axios";

export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export const getTemperaments = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/temperaments");
    const data = response.data.map((temp) => temp.name);
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
