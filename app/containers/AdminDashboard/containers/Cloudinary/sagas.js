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
  cloudinarySuccess,
  cloudinaryFailure,
  cloudinaryFetched,
  cloudinaryFetchingError
} from "./actions";
import {
  CLOUDINARY_SETUP_REQUEST,
  CLOUDINARY_SETUP_SUCCESS,
  CLOUDINARY_SETUP_FAILURE,
  CLOUDINARY_FETCH_REQUEST
} from "./constants";

import { selectCloudinary } from "./selectors";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* redirectOnSuccess() {
  const action = yield take(CLOUDINARY_SETUP_SUCCESS);
  yield put(push("/admin/dashboard"));
}

function* fetchCloudinary() {
  yield call(
    XcelTrip.get(
      "api/configuration/cloudinary",
      cloudinaryFetched,
      cloudinaryFetchingError,
      token
    )
  );
}

function* setupCloudinary(action) {
  let cloudinary = yield select(selectCloudinary());
  cloudinary = cloudinary.mergeDeep(action.data);
  console.log("action id", cloudinary.toJS());
  yield fork(
    XcelTrip.post(
      `api/configuration/cloudinary/${action.data._id}`,
      cloudinarySuccess,
      cloudinaryFailure,
      cloudinary.toJS(),
      token
    )
  );
}

function* cloudinaryWatcher() {
  yield takeLatest(CLOUDINARY_SETUP_REQUEST, setupCloudinary);
  yield takeLatest(CLOUDINARY_FETCH_REQUEST, fetchCloudinary);
}

export default [cloudinaryWatcher];
