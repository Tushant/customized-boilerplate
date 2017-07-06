import React from "react";
import { call, takeLatest, fork, put, take, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  featuresLoaded,
  featuresLoadingError,
  featureListed,
  featureListingError,
  featureEdited,
  featureEditingError
} from "./actions";

import {
  LOAD_FEATURES,
  LOAD_FEATURES_SUCCESS,
  LOAD_FEATURES_FAILURE,
  LIST_FEATURE,
  LIST_FEATURE_SUCCESS,
  LIST_FEATURE_FAILURE,
  EDIT_FEATURE,
  EDIT_FEATURE_SUCCESS,
  EDIT_FEATURE_FAILURE
} from "./constants";

import { showDialog } from "containers/App/actions";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* redirectOnSuccess() {
  const action = yield take(LIST_FEATURE_SUCCESS);
  yield put(showDialog(null));
}

function* redirectOnEditSuccess() {
  const action = yield take(EDIT_FEATURE_SUCCESS);
  yield put(showDialog(null));
}

function* fetchFeatures(action) {
  yield call(
    XcelTrip.get(
      "api/configuration/features",
      featuresLoaded,
      featuresLoadingError,
      token
    )
  );
}

function* listFeature(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.post(
      `api/configuration/features/${action.feature_type}`,
      featureListed,
      featureListingError,
      action.features,
      token
    )
  );
  yield take([LOCATION_CHANGE, LIST_FEATURE_FAILURE]);
  yield cancel(successWatcher);
}

function* editFeature(action) {
  const successWatcher = yield fork(redirectOnEditSuccess);
  console.log("actions", action.features._id);
  yield fork(
    XcelTrip.put(
      `api/configuration/features/${action.feature_type}/${action.features
        ._id}`,
      featureEdited,
      featureEditingError,
      action.features,
      token
    )
  );
  yield take([LOCATION_CHANGE, EDIT_FEATURE_FAILURE]);
  yield cancel(successWatcher);
}

function* featureWatcher() {
  yield takeLatest(LOAD_FEATURES, fetchFeatures);
  yield takeLatest(LIST_FEATURE, listFeature);
  yield takeLatest(EDIT_FEATURE, editFeature);
}

export default [featureWatcher];
