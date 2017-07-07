import {
  LOAD_MY_PROFILE,
  UPDATE_PROFILE,
  LOAD_MY_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  LOAD_MY_PROFILE_FAILURE,
  UPDATE_PROFILE_FAILURE
} from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  loading: false,
  myProfile: {},
  response: {},
  error: ""
});

function agentSettings(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_PROFILE:
    case UPDATE_PROFILE:
      return state.set("loading", true);
    case LOAD_MY_PROFILE_SUCCESS:
      return state
        .set("loading", false)
        .set("myProfile", fromJS(action.myProfile.data));
    case UPDATE_PROFILE_SUCCESS:
      console.log("action", action);
      return state
        .set("response", fromJS(action.response.data))
        .set("myProfile", fromJS(action.profile.data));
    case LOAD_MY_PROFILE_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      return state.set("error", fromJS(action.error));
    default:
      return state;
  }
}

export default agentSettings;
