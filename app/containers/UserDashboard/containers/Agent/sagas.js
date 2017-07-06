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

import { XcelTrip } from "containers/App/sagas";
import { agentApplicationSuccess, agentApplicationFailure } from "./actions";
import { AGENT_APPLICATION_REQUEST } from "./constants";

function* agentApplication(action) {
  const token = JSON.parse(localStorage.getItem("user"))["token"];
  console.log("agent application", action.data);
  const multipartFile = true;
  yield call(
    XcelTrip.post(
      "api/agent/applicant/data",
      agentApplicationSuccess,
      agentApplicationFailure,
      action.data,
      token,
      multipartFile
    )
  );
}

function* agentWatcher() {
  yield takeLatest(AGENT_APPLICATION_REQUEST, agentApplication);
}

export default [agentWatcher];
