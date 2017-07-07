import {
  AGENT_APPLICATION_REQUEST,
  AGENT_APPLICATION_SUCCESS,
  AGENT_APPLICATION_FAILURE
} from "./constants";

export function agentApplicationRequest(data) {
  console.log("data", data);
  return {
    type: AGENT_APPLICATION_REQUEST,
    data
  };
}

export function agentApplicationSuccess(response) {
  return {
    type: AGENT_APPLICATION_SUCCESS,
    response
  };
}

export function agentApplicationFailure(error) {
  return {
    type: AGENT_APPLICATION_FAILURE,
    error
  };
}
