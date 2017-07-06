import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";
import { fromJS } from "immutable";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  agentLoaded,
  agentLoadingError,
  deletedAgent,
  agentDeletingError,
  agentStatusUpdated,
  agentStatusUpdatingError
} from "./actions";
import {
  LOAD_AGENT,
  LOAD_AGENT_SUCCESS,
  LOAD_AGENT_FAILURE,
  DELETE_AGENT,
  UPDATE_AGENT
} from "./constants";

import { selectAgents, selectAgent } from "./selectors";
import { XcelTrip } from "containers/App/sagas";

const token = JSON.parse(localStorage.getItem("user"))["token"];

function* loadAgent(action) {
  yield call(
    XcelTrip.get(
      "api/agent/applicant/data",
      agentLoaded,
      agentLoadingError,
      token
    )
  );
}

function* deleteAgent(action) {
  const agentId = action.agentId;
  yield call(
    XcelTrip.delete(
      `api/agent/applicant/data/${agentId}`,
      agentDeleted,
      agentDeletingError,
      agentId
    )
  );
}

function* updateAgent(action) {
  const agentId = action.agent._id;
  const status = action.status;
  let agent_block;
  if (status === "verified") {
    agent_block = {
      _id: action.agent._id,
      reason: action.reason,
      agent_status: action.status,
      document_name: action.accepted ? action.accepted : []
    };
  } else {
    agent_block = {
      _id: action.agent._id,
      reason: action.reason,
      agent_status: action.status
    };
  }
  let agent = yield select(selectAgent(), action);
  let updatedAgent;
  let statusUpdatedAgent = agent.set("agent_status", fromJS(action.status));
  if (status === "verified") {
    updatedAgent = statusUpdatedAgent
      .setIn(["agent_info", 0, "approval_documents"], fromJS(action.accepted))
      .setIn(["agent_info", 0, "reason"], fromJS(action.reason));
  } else {
    updatedAgent = statusUpdatedAgent.setIn(
      ["agent_info", 0, "reason"],
      fromJS(action.reason)
    );
  }
  agent = agent.mergeDeep(updatedAgent);
  console.log("updateAgentStatus", agent_block);
  yield fork(
    XcelTrip.put(
      `api/agent/applicant/status/${agentId}/?status=${status}`,
      agentStatusUpdated,
      agentStatusUpdatingError,
      agent_block,
      agent.toJS(),
      agentId,
      status
    )
  );
}

function* agentWatcher() {
  yield takeLatest(LOAD_AGENT, loadAgent);
  yield takeLatest(DELETE_AGENT, deleteAgent);
  yield takeLatest(UPDATE_AGENT, updateAgent);
}

export default [agentWatcher];
