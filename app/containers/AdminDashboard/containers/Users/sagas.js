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
  userLoaded,
  userLoadingError,
  userDeleted,
  userDeletingError,
  userUpdated,
  userUpdatingError
} from "./actions";
import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  DELETE_USER,
  UPDATE_USER
} from "./constants";

import { selectUsers, selectUser } from "./selectors";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* loadUser(action) {
  yield call(
    XcelTrip.get("api/user/data", userLoaded, userLoadingError, token)
  );
}

function* deleteUser(action) {
  const userId = action.userId;
  yield call(
    XcelTrip.patch(
      `api/user/data/${userId}`,
      userDeleted,
      userDeletingError,
      userId
    )
  );
}

function* updateUser(action) {
  const userId = action.user._id;
  let userData = yield select(selectUser(), action);
  userData = userData.mergeDeep(action.user);
  yield fork(
    XcelTrip.put(
      `api/user/data/${userId}`,
      userUpdated,
      userUpdatingError,
      userData.toJS(),
      token
    )
  );
}

function* userWatcher() {
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(DELETE_USER, deleteUser);
  yield takeLatest(UPDATE_USER, updateUser);
}

export default [userWatcher];
