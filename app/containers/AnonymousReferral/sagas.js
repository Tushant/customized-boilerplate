import React from "react";
import { take, takeLatest, call, fork, cancel, put } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  ANONYMOUS_AGENT,
  ANONYMOUS_AGENT_SUCCESS,
  ANONYMOUS_AGENT_FAILURE
} from "./constants";
import { showDialog } from "containers/App/actions";
import Login from "containers/LoginContainer";
import {
  anonymousagentApplied,
  anonymousagentApplicationFailure
} from "./actions";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnReferralSuccess() {
  const action = yield take(ANONYMOUS_AGENT_SUCCESS);
  yield put(showDialog(<Login />));
}

function* anonymousAgent(action) {
  console.log("agent anonymous", action);
  const anonymous_agent_info = action.anonymous_agent;
  const referral_id = action.anonymous_agent.refer_code;
  const successWatcher = yield fork(redirectOnReferralSuccess);
  yield call(
    XcelTrip.post(
      `api/agent/new/referral/${referral_id}`,
      anonymousagentApplied,
      anonymousagentApplicationFailure,
      anonymous_agent_info
    )
  );
  yield take([LOCATION_CHANGE, ANONYMOUS_AGENT_FAILURE]);
  yield cancel(successWatcher);
}

function* anonymousAgentApplicationWatcher() {
  yield takeLatest(ANONYMOUS_AGENT, anonymousAgent);
}

export default [anonymousAgentApplicationWatcher];
