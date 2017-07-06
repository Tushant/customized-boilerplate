import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";

import {
  logFetched,
  logFetchingError,
  logDeleted,
  logDeletingError,
  logsDeleted,
  logsDeletingError
} from "./actions";
import {
  LOGS_FETCH_REQUEST,
  LOG_DELETE_REQUEST,
  LOGS_DELETE_REQUEST
} from "./constants";

import { XcelTrip } from "containers/App/sagas";
import { selectLogs } from "./selectors";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* fetchLogs() {
  yield call(
    XcelTrip.get("api/error-logs", logFetched, logFetchingError, token)
  );
}

function* deleteLog(action) {
  const logId = action.logId;
  yield call(
    XcelTrip.delete(
      `api/error-logs/${logId}`,
      logDeleted,
      logDeletingError,
      logId
    )
  );
}

function* deleteLogs() {
  const logs = yield select(selectLogs());
  if (logs.size) {
    yield call(
      XcelTrip.delete(`api/error-logs/`, logsDeleted, logsDeletingError)
    );
  }
}

function* logWatcher() {
  yield takeLatest(LOGS_FETCH_REQUEST, fetchLogs);
  yield takeLatest(LOG_DELETE_REQUEST, deleteLog);
  yield takeLatest(LOGS_DELETE_REQUEST, deleteLogs);
}

export default [logWatcher];
