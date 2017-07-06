import { fromJS } from "immutable";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  messages: {},
  errors: {}
});

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return state
        .set("requesting", true)
        .set("successful", false)
        .setIn(["messages", "message"], "Signing up...");
    case SIGNUP_SUCCESS:
      console.log("success", action);
      return state
        .set("requesting", false)
        .set("successful", true)
        .setIn(["messages", "body"], `successfuly created account`);
    case SIGNUP_ERROR:
      return state
        .set("requesting", false)
        .set("successful", false)
        .setIn(["errors", "body"], action.error.toString());
    default:
      return state;
  }
}

export default signupReducer;
