import {
  LOAD_AGENT,
  LOAD_AGENT_SUCCESS,
  LOAD_AGENT_FAILURE,
  DELETE_AGENT,
  DELETE_AGENT_SUCCESS,
  DELETE_AGENT_FAILURE,
  UPDATE_AGENT,
  UPDATE_AGENT_SUCCESS,
  UPDATE_AGENT_FAILURE
} from "./constants";

import action from "utils/action";

export function loadAgents() {
  return {
    type: LOAD_AGENT
  };
}

export function agentLoaded(agents) {
  return {
    type: LOAD_AGENT_SUCCESS,
    agents
  };
}

export function agentLoadingError(error) {
  return {
    type: LOAD_AGENT_FAILURE,
    error
  };
}

export const deleteAgent = action(DELETE_AGENT, "agentId");
export const deletedAgent = action(DELETE_AGENT_SUCCESS, "response", "agentId");
export const agentDeletingError = action(DELETE_AGENT_FAILURE, "error");

export const updateAgentStatus = action(
  UPDATE_AGENT,
  "status",
  "agent",
  "accepted",
  "reason"
);
export const agentStatusUpdated = action(
  UPDATE_AGENT_SUCCESS,
  "response",
  "agent",
  "status",
  "reason",
  "accepted"
);
export const agentStatusUpdatingError = action(UPDATE_AGENT_FAILURE, "error");
