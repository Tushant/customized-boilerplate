import { fromJS } from "immutable";
import {
  EMAIL_SERVICE_SETUP_REQUEST,
  EMAIL_SERVICE_SETUP_SUCCESS,
  EMAIL_SERVICE_SETUP_FAILURE,
  EMAIL_SERVICE_FETCH_REQUEST,
  EMAIL_SERVICE_FETCH_SUCCESS,
  EMAIL_SERVICE_FETCH_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  emailService: {},
  error: null
});

function emailServiceState(state = initialState, action) {
  switch (action.type) {
    case EMAIL_SERVICE_SETUP_REQUEST:
    case EMAIL_SERVICE_FETCH_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case EMAIL_SERVICE_SETUP_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("emailService", fromJS(action.emailService.data));
    case EMAIL_SERVICE_FETCH_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("emailService", fromJS(action.emailService.data));
    case EMAIL_SERVICE_SETUP_FAILURE:
    case EMAIL_SERVICE_FETCH_FAILURE:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default emailServiceState;
