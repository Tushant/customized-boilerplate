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

import action from "utils/action";

export const logRequest = action(LOGS_FETCH_REQUEST);
export const logFetched = action(LOGS_FETCH_SUCCESS, "logs");
export const logFetchingError = action(LOGS_FETCH_FAILURE, "error");

export const logDelete = logId => ({
  type: LOG_DELETE_REQUEST,
  shouldConfirm: true,
  logId
});

export const logDeleted = action(LOG_DELETE_SUCCESS, "response", "logId");
export const logDeletingFailure = action(LOG_DELETE_FAILURE, "error");

export const logsDelete = action(LOGS_DELETE_REQUEST);
export const logsDeleted = action(LOGS_DELETE_SUCCESS, "response");
export const logsDeletingFailure = action(LOGS_DELETE_FAILURE, "error");
