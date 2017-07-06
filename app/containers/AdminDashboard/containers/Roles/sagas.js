import { takeLatest, call } from "redux-saga/effects";

import { rolesFetched, rolesFetchingFailure } from "./actions";
import { ROLES_FETCH_REQUEST } from "./constants";

import { XcelTrip } from "containers/App/sagas";

function* fetchRoles() {
  const token = JSON.parse(localStorage.getItem("user"))["token"];
  yield call(
    XcelTrip.get(
      "api/configuration/role",
      rolesFetched,
      rolesFetchingFailure,
      token
    )
  );
}

function* rolesWatcher() {
  yield takeLatest(ROLES_FETCH_REQUEST, fetchRoles);
}

export default [rolesWatcher];
