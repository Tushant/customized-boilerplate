import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  emailServiceSuccess,
  emailServiceFailure,
  emailServiceFetched,
  emailServiceFetchingError
} from "./actions";
import {
  EMAIL_SERVICE_SETUP_REQUEST,
  EMAIL_SERVICE_SETUP_SUCCESS,
  EMAIL_SERVICE_SETUP_FAILURE,
  EMAIL_SERVICE_FETCH_REQUEST
} from "./constants";

import { selectemailService } from "./selectors";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* redirectOnSuccess() {
  const action = yield take(EMAIL_SERVICE_SETUP_SUCCESS);
  yield put(push("/admin/dashboard"));
}

function* fetchemailService(action) {
  yield call(
    XcelTrip.get(
      "api/configuration/email-service",
      emailServiceFetched,
      emailServiceFetchingError,
      token
    )
  );
}

function* setupemailService(action) {
  // const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.put(
      `api/configuration/email-service/${action.data._id}`,
      emailServiceSuccess,
      emailServiceFailure,
      action.data,
      token
    )
  );
  // yield take([LOCATION_CHANGE, EMAIL_SERVICE_SETUP_FAILURE]);
  // yield cancel(successWatcher);
}

function* emailServiceWatcher() {
  yield takeLatest(EMAIL_SERVICE_SETUP_REQUEST, setupemailService);
  yield takeLatest(EMAIL_SERVICE_FETCH_REQUEST, fetchemailService);
}

export default [emailServiceWatcher];
