/*
 *
 * LoginContainer reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  isLoggedIn: false,
  userInfo: {},
  messages: {},
  errors: {}
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.user.data.token);
      localStorage.setItem("user", JSON.stringify(action.user.data));
      return state
        .set("userInfo", action.user.data.userInfo)
        .set("isLoggedIn", true);
    // return state.set({
    //   userInfo: action.user.data.userInfo,
    //   isLoggedIn: true
    // });
    case LOGIN_FAILURE:
      console.log("login-error", action);
      return state
        .set("requesting", false)
        .set("successful", false)
        .setIn(["errors", "body"], action.error);
    case LOGOUT:
      return state.set("requesting", true);
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return state.set("messages", fromJS(action.response.data));
    case LOGOUT_FAILURE:
      return state.set("error", fromJS(action.error));
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default loginReducer;
