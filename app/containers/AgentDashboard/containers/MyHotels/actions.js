import {
  REFER_AGENT,
  REFER_AGENT_SUCCESS,
  REFER_AGENT_FAILURE
} from "./constants";

import action from "utils/action";

export const referAgent = action(REFER_AGENT, "referred_agent");
export const agentReferred = action(REFER_AGENT_SUCCESS, "response");
export const agentReferingFailure = action(REFER_AGENT_FAILURE, "error");
