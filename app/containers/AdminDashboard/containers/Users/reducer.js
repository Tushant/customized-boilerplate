import { fromJS } from "immutable";
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from "./constants";

import reviver from "utils/reviver";
const idReviver = reviver("_id", true);

const initialState = fromJS({
  loading: false,
  loaded: false,
  users: {},
  response: {},
  deleted: false,
  errors: null
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
    case DELETE_USER:
    case UPDATE_USER:
      return state.set("loading", true).set("error", null);
    case LOAD_USER_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("users", action.users.data);
    case UPDATE_USER_SUCCESS:
      return state.set("loading", false).set("response", action.response.data);
    case LOAD_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return state.set("errors", action.error).set("loading", false);
    case DELETE_USER_SUCCESS:
      return state
        .set("loading", false)
        .set("deleted", true)
        .set("response", action.response)
        .set(
          "users",
          state.get("users").filter(user => {
            console.log(
              "user",
              user.get("_id"),
              action.userId[0],
              action.userId
            );
            return user.get("_id") !== action.userId[0];
          })
        );
    default:
      return state;
  }
}

export default userReducer;
