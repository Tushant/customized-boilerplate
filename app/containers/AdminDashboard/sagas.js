import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  fork,
  cancel,
  select
} from "redux-saga/effects";

import {
  loadInitialDataSuccess,
  loadInitialDataError
} from "containers/App/actions";

import {
  cloudinaryFetched,
  cloudinaryFetchingError
} from "../AdminDashboard/containers/Cloudinary/actions";

import {
  API_BASE,
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR
} from "containers/App/constants";

import { XcelTrip } from "containers/App/sagas";

function* loadInitialData() {
  console.log("load");
  yield call(
    XcelTrip.get(
      "api/configuration/cloudinary",
      cloudinaryFetched,
      cloudinaryFetchingError
    )
  );
  yield put(loadInitialDataSuccess());
}

function* initialize() {
  const watcher = yield fork(loadInitialData);
  yield take([INITIALIZE_ERROR, INITIALIZE_SUCCESS]);
  yield cancel(watcher);
}

function* adminDashboardWatcher() {
  yield takeLatest(INITIALIZE, initialize);
}

export default [adminDashboardWatcher];
