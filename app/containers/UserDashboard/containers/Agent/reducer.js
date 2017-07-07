import { fromJS } from "immutable";
import {
  AGENT_APPLICATION_REQUEST,
  AGENT_APPLICATION_SUCCESS,
  AGENT_APPLICATION_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  requested: true,
  response: {},
  agents: {},
  errors: {}
});

function agentReducer(state = initialState, action) {
  switch (action.type) {
    case AGENT_APPLICATION_REQUEST:
      return state.set("requesting", true).set("requested", false);
    case AGENT_APPLICATION_SUCCESS:
      console.log("aresponse", action);
      return state
        .set("requested", true)
        .set("response", fromJS(action.response));
    case AGENT_APPLICATION_FAILURE:
      console.log("error from server", action);
      return state.set("errors", fromJS(action.error));
    default:
      return state;
  }
}

export default agentReducer;
