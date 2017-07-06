import {
  MY_AGENT,
  MY_AGENT_SUCCESS,
  MY_AGENT_FAILURE,
  REFER_AGENT,
  REFER_AGENT_SUCCESS,
  REFER_AGENT_FAILURE
} from "./constants";

import action from "utils/action";

export const loadMyAgents = action(MY_AGENT);
export const myAgentLoaded = action(MY_AGENT_SUCCESS, "myAgents");
export const myAgentLoadingFailure = action(MY_AGENT_FAILURE, "error");

export const referAgent = action(REFER_AGENT, "referred_agent");
export const agentReferred = action(REFER_AGENT_SUCCESS, "response");
export const agentReferingFailure = action(REFER_AGENT_FAILURE, "error");
