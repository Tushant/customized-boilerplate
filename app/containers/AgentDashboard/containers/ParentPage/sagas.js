import { take, takeLatest, call, fork, cancel, put } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";

import {
  REFER_AGENT,
  REFER_AGENT_SUCCESS,
  REFER_AGENT_FAILURE
} from "./constants";
import { showDialog } from "containers/App/actions";

import { agentReferred, agentReferingFailure } from "./actions";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* redirectOnReferralSuccess() {
  const action = yield take(REFER_AGENT_SUCCESS);
  yield put(showDialog(null));
}

function* referAgent(action) {
  const referred_agent_info = action.referred_agent;
  const successWatcher = yield fork(redirectOnReferralSuccess);
  yield call(
    XcelTrip.post(
      "api/agent/referral",
      agentReferred,
      agentReferingFailure,
      referred_agent_info,
      token
    )
  );
  yield take([LOCATION_CHANGE, REFER_AGENT_FAILURE]);
  yield cancel(successWatcher);
}

function* agentReferralWatcher() {
  yield takeLatest(REFER_AGENT, referAgent);
}

export default [agentReferralWatcher];
