import { call, takeLatest } from "redux-saga/effects";
import { LOAD_MY_PROFILE, UPDATE_PROFILE } from "./constants";
import {
  myProfileLoaded,
  myProfileLoadingFailure,
  profileUpdated,
  profileUpdatingFailure
} from "./actions";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* loadMyProfile() {
  const userId = JSON.parse(localStorage.getItem("user"))["userInfo"]["_id"];
  yield call(
    XcelTrip.get(
      `api/agent/applicant/data/${userId}`,
      myProfileLoaded,
      myProfileLoadingFailure,
      token
    )
  );
}

function* updateProfile(action) {
  const profile = action.profile;
  yield call(
    XcelTrip.put(
      `api/user/data/${action.agentId}`,
      profileUpdated,
      profileUpdatingFailure,
      profile,
      token
    )
  );
}

function* agentSettingsWatcher() {
  yield takeLatest(LOAD_MY_PROFILE, loadMyProfile);
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}

export default [agentSettingsWatcher];
