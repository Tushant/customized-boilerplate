import { fromJS } from "immutable";
import {
  ANALYTICS_FETCH_REQUEST,
  ANALYTICS_FETCH_SUCCESS,
  ANALYTICS_FETCH_FAILURE,
  ANALYTICS_SETUP_REQUEST,
  ANALYTICS_SETUP_SUCCESS,
  ANALYTICS_SETUP_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  analytics: {},
  error: null
});

function analyticsState(state = initialState, action) {
  switch (action.type) {
    case ANALYTICS_FETCH_REQUEST:
    case ANALYTICS_SETUP_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case ANALYTICS_FETCH_SUCCESS:
    case ANALYTICS_SETUP_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("analytics", fromJS(action.analytics.data));
    case ANALYTICS_FETCH_FAILURE:
    case ANALYTICS_SETUP_FAILURE:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default analyticsState;
