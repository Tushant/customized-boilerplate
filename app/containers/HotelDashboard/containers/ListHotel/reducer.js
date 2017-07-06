import {
  REFER_AGENT,
  REFER_AGENT_SUCCESS,
  REFER_AGENT_FAILURE
} from "./constants";

import { fromJS } from "immutable";

const initialState = fromJS({
  loading: false,
  response: {},
  error: null
});

function agentReferralReducer(state = initialState, action) {
  switch (action.type) {
    case REFER_AGENT:
      return state.set("loading", true);
    case REFER_AGENT_SUCCESS:
      console.log("referral action", action);
      return state
        .set("loading", false)
        .set("response", fromJS(action.response.data));
    case REFER_AGENT_FAILURE:
      return state.set("loading", false).set("error", fromJS(action.error));
    default:
      return state;
  }
}

export default agentReferralReducer;
