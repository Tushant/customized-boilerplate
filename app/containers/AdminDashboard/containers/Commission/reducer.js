import { fromJS } from "immutable";
import {
  COMMISSION_FETCH_REQUEST,
  COMMISSION_FETCH_SUCCESS,
  COMMISSION_FETCH_FAILURE,
  COMMISSION_SETUP_REQUEST,
  COMMISSION_SETUP_SUCCESS,
  COMMISSION_SETUP_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  response: {},
  commission: {},
  error: null
});

function commissionState(state = initialState, action) {
  switch (action.type) {
    case COMMISSION_SETUP_REQUEST:
    case COMMISSION_FETCH_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case COMMISSION_SETUP_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("commission", fromJS(action.commission.data));
    case COMMISSION_FETCH_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("commission", fromJS(action.commission.data));
    case COMMISSION_SETUP_FAILURE:
    case COMMISSION_FETCH_FAILURE:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default commissionState;
