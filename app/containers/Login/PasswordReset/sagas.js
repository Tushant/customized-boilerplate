/**
 * Created by Edge on 6/15/2017.
 */
import { takeLatest, take, put, call, fork, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as TYPES from "./constants";
import {
  passwordResetSuccess,
  passwordResetError,
  newPasswordSuccess,
  newPasswordError
} from "./actions";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnSuccess() {
  const action = yield take(TYPES.PASSWORD_RESET_SUCCESS);
  // yield put(push(`/`));
}

function* passwordResetFlow(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield call(XcelTrip.get(`api/password-reset/user/${action.data}`, passwordResetSuccess, passwordResetError, action.data));
  yield take([LOCATION_CHANGE, TYPES.PASSWORD_RESET_ERROR]);
  yield cancel(successWatcher);
}

function* redirectOnNewPasswordSuccess() {
  const action = yield take(TYPES.NEW_PASSWORD_SUCCESS);
  // yield put(push(`/`));
}
function* newPasswordFlow(action) {
  const successWatcher = yield fork(redirectOnNewPasswordSuccess);
  console.log('data', action.data);
  yield call(XcelTrip.post(`api/user/change-password/confirm/${action.token}`, newPasswordSuccess, newPasswordError, Object.assign({}, {password: action.data})));
  yield take([LOCATION_CHANGE, TYPES.NEW_PASSWORD_ERROR]);
  yield cancel(successWatcher);
}

function* passwordResetWatcher() {
  yield takeLatest(TYPES.PASSWORD_RESET_REQUEST, passwordResetFlow);

  yield takeLatest(TYPES.NEW_PASSWORD_REQUEST, newPasswordFlow);
}

export default [passwordResetWatcher];
