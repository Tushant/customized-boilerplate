import {
  ANONYMOUS_AGENT,
  ANONYMOUS_AGENT_SUCCESS,
  ANONYMOUS_AGENT_FAILURE
} from "./constants";

import action from "utils/action";

export const anonymousAgentApplication = action(
  ANONYMOUS_AGENT,
  "anonymous_agent"
);
export const anonymousagentApplied = action(
  ANONYMOUS_AGENT_SUCCESS,
  "response"
);
export const anonymousagentApplicationFailure = action(
  ANONYMOUS_AGENT_FAILURE,
  "error"
);
