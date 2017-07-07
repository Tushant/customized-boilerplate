import {
  ANONYMOUS_AGENT,
  ANONYMOUS_AGENT_SUCCESS,
  ANONYMOUS_AGENT_FAILURE
} from "./constants";

import { fromJS } from "immutable";

const initialState = fromJS({
  loading: false,
  response: {},
  error: null
});

function anonymousAgentReducer(state = initialState, action) {
  switch (action.type) {
    case ANONYMOUS_AGENT:
      return state.set("loading", true);
    case ANONYMOUS_AGENT_SUCCESS:
      console.log("referral action", action);
      return state
        .set("loading", false)
        .set("response", fromJS(action.response.data));
    case ANONYMOUS_AGENT_FAILURE:
      return state.set("loading", false).set("error", fromJS(action.error));
    default:
      return state;
  }
}

export default anonymousAgentReducer;
