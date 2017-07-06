/**
 * Created by Edge on 6/15/2017.
 */
import { takeLatest, take, put, fork, cancel, call } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as TYPES from "./constants";
import {
  confirmUserSuccess,
  confirmUserError,
  resendConfirmationSuccess,
  resendConfirmationError
} from "./actions";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnSuccess() {
  const action = yield take(TYPES.CONFIRM_USER_SUCCESS);
  console.log(action);
  // do something on success maybe send a toast
  yield put(push(`/`));
}

function* confirmUserFlow(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield call(XcelTrip.get(`api/confirm/user/${action.data}`, confirmUserSuccess, confirmUserError, action.data));
  yield take([LOCATION_CHANGE, TYPES.CONFIRM_USER_ERROR]);
  yield cancel(successWatcher);
}

function* resendConfirmationFlow() {
  const successWatcher = yield fork(redirectOnSuccess);
  yield call(XcelTrip.get(`api/user/resend-confirm-email`, resendConfirmationSuccess, resendConfirmationError, null));
  yield take([LOCATION_CHANGE, TYPES.CONFIRM_USER_ERROR]);
  yield cancel(successWatcher);
}
function* confirmUserWatcher() {
  yield takeLatest(TYPES.CONFIRM_USER_REQUEST, confirmUserFlow);
  yield takeLatest(TYPES.RESEND_CONFIRMATION_REQUEST, resendConfirmationFlow);
}

export default [confirmUserWatcher];
