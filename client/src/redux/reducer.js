import {
  GET_TEMPERAMENTS,
  FETCH_DOGS_REQUEST,
  FETCH_DOGS_SUCCESS,
  FETCH_DOGS_FAILURE,
  FILTER_DOGS,
  FILTER_DOGS_BY_NAME,
  FILTER_DOGS_BY_TEMPERAMENT,
  ORDER_DOGS,
} from "./actions";
const initialState = {
  temperaments: [],
  dogs: [],
  originalDogs: [],
  loading: true,
  error: "",
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    case FETCH_DOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        originalDogs: action.payload,
        dogs: action.payload,
        error: "",
      };
    case FETCH_DOGS_FAILURE:
      return {
        loading: false,
        dogs: [],
        error: action.payload,
      };
    case FILTER_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case ORDER_DOGS:
      const dogCopy = [...state.dogs];
      const order = action.payload;
      if (order === "nombre-min") {
        dogCopy.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "nombre-max") {
        dogCopy.sort((a, b) => b.name.localeCompare(a.name));
      } else if (order === "peso-min") {
        dogCopy.sort((a, b) => {
          const weightA = peso(a.weight);
          const weightB = peso(b.weight);
          return weightA - weightB;
        });
      } else if (order === "peso-max") {
        dogCopy.sort((a, b) => {
          const weightA = peso(a.weight);
          const weightB = peso(b.weight);
          return weightB - weightA;
        });
      }
      return {
        ...state,
        dogs: dogCopy,
      };
    case FILTER_DOGS_BY_TEMPERAMENT:
      const { dogs } = state;
      if (action.payload !== "") {
        const temperament = action.payload.toLowerCase().trim();
        const filteredDogs = dogs.filter((dog) => {
          const temperaments =
            dog.temperament &&
            dog.temperament.split(",").map((t) => t.toLowerCase().trim());
          return temperaments && temperaments.includes(temperament);
        });
        return {
          ...state,
          dogs: filteredDogs,
        };
      } else {
        return {
          ...state,
          dogs: state.originalDogs,
        };
      }
    case FILTER_DOGS:
      if (action.payload === "all") {
        return {
          ...state,
          dogs: state.originalDogs,
        };
      } else if (action.payload === "api") {
        const apiDogs = state.originalDogs.filter((dog) => {
          return !isUUID(dog.id);
        });
        return {
          ...state,
          dogs: apiDogs,
        };
      } else if (action.payload === "db") {
        const dbDogs = state.originalDogs.filter((dog) => {
          return isUUID(dog.id);
        });
        return {
          ...state,
          dogs: dbDogs,
        };
      } else {
        return {
          state,
        };
      }
    default:
      return state;
  }
}
const peso = (weight) => {
  const weightValueA = weight.metric
    ? weight.metric.split("-")[0] && !isNaN(weight.metric.split("-")[0])
      ? weight.metric.split("-")[0]
      : 0
    : weight.split("-")[0];
  const weightValueB = weight.metric
    ? weight.metric.split("-")[1] && !isNaN(weight.metric.split("-")[1])
      ? weight.metric.split("-")[1]
      : 0
    : weight.split("-")[1];
  const weightAvg = (parseInt(weightValueA) + parseInt(weightValueB)) / 2;
  return weightAvg;
};
const isUUID = (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};
