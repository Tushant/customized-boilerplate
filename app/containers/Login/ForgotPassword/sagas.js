/**
 * Created by Edge on 6/15/2017.
 */
import { takeLatest, take, put, call, fork, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as TYPES from "./constants";
import { forgotPasswordSuccess, forgotPasswordError } from "./actions";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnSuccess() {
  const action = yield take(TYPES.FORGOT_PASSWORD_SUCCESS);
  console.log(action);
  yield put(push(`/`));
}

function* forgotPasswordFlow(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  console.log('data', action.data);
  yield call(XcelTrip.post("api/user/security-settings/reset-password-link", forgotPasswordSuccess, forgotPasswordError, action.data));
  yield take([LOCATION_CHANGE, TYPES.FORGOT_PASSWORD_ERROR]);
  yield cancel(successWatcher);
}

function* forgotPasswordWatcher() {
  yield takeLatest(TYPES.FORGOT_PASSWORD_REQUEST, forgotPasswordFlow);
}

export default [forgotPasswordWatcher];
