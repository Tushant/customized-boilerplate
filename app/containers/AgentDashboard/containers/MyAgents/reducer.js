import {
  MY_AGENT,
  MY_AGENT_SUCCESS,
  MY_AGENT_FAILURE,
  REFER_AGENT,
  REFER_AGENT_SUCCESS,
  REFER_AGENT_FAILURE
} from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  loading: false,
  myAgents: {},
  response: {},
  error: null
});

function myAgentsReducer(state = initialState, action) {
  switch (action.type) {
    case MY_AGENT:
      return state.set("loading", true);
    case MY_AGENT_SUCCESS:
      return state
        .set("loading", false)
        .set("myAgents", fromJS(action.myAgents.data.dataList));
    case MY_AGENT_FAILURE:
    case REFER_AGENT_FAILURE:
      return state.set("loading", false).set("error", fromJS(action.error));
    case REFER_AGENT:
      return state.set("loading", true);
    case REFER_AGENT_SUCCESS:
      console.log("referral action", action);
      return state
        .set("loading", false)
        .set("response", fromJS(action.response.data));
    default:
      return state;
  }
}

export default myAgentsReducer;
