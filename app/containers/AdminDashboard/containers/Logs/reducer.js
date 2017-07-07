import { fromJS } from "immutable";

import {
  LOGS_FETCH_REQUEST,
  LOGS_FETCH_SUCCESS,
  LOGS_FETCH_FAILURE,
  LOG_DELETE_REQUEST,
  LOG_DELETE_SUCCESS,
  LOG_DELETE_FAILURE,
  LOGS_DELETE_REQUEST,
  LOGS_DELETE_SUCCESS,
  LOGS_DELETE_FAILURE
} from "./constants";

import reviver from "utils/reviver";
const idReviver = reviver("_id", true);

const initialState = fromJS({
  requesting: false,
  deleted: false,
  response: {},
  logs: {},
  error: null
});

function showLogs(state = initialState, action) {
  switch (action.type) {
    case LOGS_FETCH_REQUEST:
    case LOG_DELETE_REQUEST:
    case LOGS_DELETE_REQUEST:
      return state.set("requesting", true);
    case LOGS_FETCH_SUCCESS:
      return state
        .set("requesting", false)
        .set("logs", fromJS(action.logs.data.dataList, idReviver));
    case LOGS_FETCH_FAILURE:
    case LOG_DELETE_FAILURE:
    case LOGS_DELETE_FAILURE:
      return state.set("error", action.error).set("requesting", false);
    case LOG_DELETE_SUCCESS:
      return state
        .set("deleted", true)
        .set("requesting", false)
        .set("response", fromJS(action.response))
        .deleteIn(["logs", action.logId[0]]);
    case LOGS_DELETE_SUCCESS:
      return state
        .set("deleted", true)
        .set("requesting", false)
        .set("response", fromJS(action.response))
        .set("logs", state.get("logs").clear());
    default:
      return state;
  }
}

export default showLogs;
