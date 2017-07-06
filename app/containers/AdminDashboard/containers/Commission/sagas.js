import { takeLatest, fork, call, put, cancel, take } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  commissionSuccess,
  commissionFailure,
  commissionFetched,
  commissionFetchingFailure
} from "./actions";
import {
  COMMISSION_FETCH_REQUEST,
  COMMISSION_SETUP_REQUEST,
  COMMISSION_SETUP_SUCCESS,
  COMMISSION_SETUP_FAILURE
} from "./constants";

import { XcelTrip } from "containers/App/sagas";

function* redirectOnSuccess() {
  const action = yield take(COMMISSION_SETUP_SUCCESS);
  yield put(push("/admin/dashboard/commission"));
}

function* setupCommission(action) {
  // let commission = yield select(selectCommission());
  // commission = commission.mergeDeep(action.data);
  const token = JSON.parse(localStorage.getItem("user"))["token"];
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.put(
      `api/configuration/commission-setting/${action.data._id}`,
      commissionSuccess,
      commissionFailure,
      action.data,
      token
    )
  );
  yield take([LOCATION_CHANGE, COMMISSION_SETUP_FAILURE]);
  yield cancel(successWatcher);
}

function* fetchCommission() {
    const token = JSON.parse(localStorage.getItem("user"))["token"];

  yield call(
    XcelTrip.get(
      "api/configuration/commission-setting",
      commissionFetched,
      commissionFetchingFailure,
      token
    )
  );
}

function* commissionWatcher() {
  yield takeLatest(COMMISSION_SETUP_REQUEST, setupCommission);
  yield takeLatest(COMMISSION_FETCH_REQUEST, fetchCommission);
}

export default [commissionWatcher];
