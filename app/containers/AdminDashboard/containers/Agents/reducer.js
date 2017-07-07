import { fromJS } from "immutable";
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
import { selectAgent } from "./selectors";

const initialState = fromJS({
  fetching: false,
  fetched: false,
  agents: {},
  response: {},
  deleted: false,
  errors: null
});

function agentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_AGENT:
    case DELETE_AGENT:
    case UPDATE_AGENT:
      return state.set("fetching", true).set("fetched", false);
    case LOAD_AGENT_SUCCESS:
      return state
        .set("fetching", false)
        .set("fetched", true)
        .set("agents", fromJS(action.agents.data.dataList));
    case UPDATE_AGENT_SUCCESS: {
      const agent_info = action.agent.agent_info;
      return state
        .set("fetching", false)
        .update("agents", agents =>
          state.get("agents").map(agent => {
            if (agent.get("_id") === action.agent._id) {
              console.log("agent will be updated", action.agent);
              return fromJS(action.agent);
            } else {
              return state.get("agents");
            }
          })
        )
        .set("response", fromJS(action.response.data));
    }
    case LOAD_AGENT_FAILURE:
    case DELETE_AGENT_FAILURE:
    case UPDATE_AGENT_FAILURE:
      return state.set("errors", action.error);
    case DELETE_AGENT_SUCCESS:
      return state
        .set("fetching", false)
        .set("deleted", true)
        .set("response", fromJS(action.response))
        .set(
          "agents",
          state.get("agents").filter(agent => {
            console.log(
              "agent",
              agent.get("_id"),
              action.agentId[0],
              action.agentId
            );
            return agent.get("_id") !== action.agentId[0];
          })
        );
    default:
      return state;
  }
}

export default agentReducer;
