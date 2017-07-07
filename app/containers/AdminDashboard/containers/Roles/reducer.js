import { fromJS } from "immutable";
import {
  ROLES_FETCH_REQUEST,
  ROLES_FETCH_SUCCESS,
  ROLES_FETCH_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  role: {},
  error: null
});

function roleReducer(state = initialState, action) {
  switch (action.type) {
    case ROLES_FETCH_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case ROLES_FETCH_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("role", fromJS(action.roles.data));
    case ROLES_FETCH_FAILURE:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default roleReducer;
