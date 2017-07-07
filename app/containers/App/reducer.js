import { fromJS } from "immutable";

import { CLIENT_SET, CLIENT_UNSET, SHOW_DIALOG } from "./constants";

import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR
} from "containers/App/constants";

// The initial state of the App
const initialState = fromJS({
  initialized: false,
  errors: {},
  id: null,
  token: null,
  dialog: null
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_ERROR:
      return state.set("initialized", false);
    case INITIALIZE_SUCCESS:
      return state.set("initialized", true);
    case SHOW_DIALOG:
      return state.set("dialog", action.dialog);
    case CLIENT_SET:
      return state.set("token", action.token).set("id", action.id);
    case CLIENT_UNSET:
      return state.set("id", null).set("token", null);
    default:
      return state;
  }
}

export default appReducer;
