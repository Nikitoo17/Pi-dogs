import { GET_TEMPERAMENTS } from "./actions";
const initialState = {
  temperaments: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };

    default:
      return state;
  }
}
