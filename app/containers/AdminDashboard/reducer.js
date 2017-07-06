import { fromJS } from "immutable";

import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR
} from "containers/App/constants";

const initialState = fromJS({
  initialized: false,
  id: null,
  token: null,
  error: false,
  dialog: null
});

function adminDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_ERROR:
      return state.set("initialized", false);
    case INITIALIZE_SUCCESS:
      return state.set("initialized", true);
    default:
      return state;
  }
}

export default adminDashboardReducer;
