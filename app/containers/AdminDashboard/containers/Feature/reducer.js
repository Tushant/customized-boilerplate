import {
  LOAD_FEATURES,
  LOAD_FEATURES_SUCCESS,
  LOAD_FEATURES_FAILURE,
  LIST_FEATURE,
  LIST_FEATURE_SUCCESS,
  LIST_FEATURE_FAILURE,
  EDIT_FEATURE,
  EDIT_FEATURE_SUCCESS,
  EDIT_FEATURE_FAILURE
} from "./constants";

import { fromJS } from "immutable";
import reviver from "utils/reviver";
const idReviver = reviver("_id", true);

const initialState = fromJS({
  requesting: false,
  features: {},
  response: {}
});

function featureReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FEATURES:
    case LIST_FEATURE:
    case EDIT_FEATURE:
      return state.set("requesting", true);
    case LOAD_FEATURES_SUCCESS:
      return state
        .set("requesting", false)
        .set("features", action.features.data);
    case LIST_FEATURE_SUCCESS:
      console.log("features", action);
      return state.set("requesting", false).set("response", action.response);
    case EDIT_FEATURE_SUCCESS:
      console.log("EDIT_FEATURE_SUCCESS", action);
      return state
        .set("requesting", false)
        .set("response", fromJS(action.response));
    case LOAD_FEATURES_FAILURE:
    case LIST_FEATURE_FAILURE:
    case EDIT_FEATURE_FAILURE:
      return state.set("requesting", false).set("error", fromJS(action.error));
    default:
      return state;
  }
}

export default featureReducer;
