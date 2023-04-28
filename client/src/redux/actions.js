import axios from "axios";

export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

export const FETCH_DOGS_REQUEST = "FETCH_DOGS_REQUEST";
export const FETCH_DOGS_SUCCESS = "FETCH_DOGS_SUCCESS";
export const FETCH_DOGS_FAILURE = "FETCH_DOGS_FAILURE";
export const FILTER_DOGS_BY_NAME = "FILTER_DOGS_BY_NAME";
export const ORDER_DOGS = "ORDER_DOGS";
export const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT";
export const FILTER_DOGS = "FILTER_DOGS";

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
export const fetchDogsRequest = () => {
  return {
    type: FETCH_DOGS_REQUEST,
  };
};

export const fetchDogsSuccess = (dogs) => {
  return {
    type: FETCH_DOGS_SUCCESS,
    payload: dogs,
  };
};

export const fetchDogsFailure = (error) => {
  return {
    type: FETCH_DOGS_FAILURE,
    payload: error,
  };
};

export const fetchDogs = () => {
  return (dispatch) => {
    dispatch(fetchDogsRequest());
    axios
      .get("http://localhost:3001/dogs/")
      .then((response) => {
        const dogs = response.data;
        dispatch(fetchDogsSuccess(dogs));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchDogsFailure(errorMessage));
      });
  };
};
export const filterDogsByName = (filtered) => ({
  type: FILTER_DOGS_BY_NAME,
  payload: filtered,
});
export const orderDogs = (order) => {
  return {
    type: "ORDER_DOGS",
    payload: order,
  };
};
export const filterDogsByTemperament = (temperament) => {
  return {
    type: "FILTER_DOGS_BY_TEMPERAMENT",
    payload: temperament,
  };
};
export const filterDogs = (type) => {
  return {
    type: "FILTER_DOGS",
    payload: type,
  };
};
