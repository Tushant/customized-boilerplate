/**
 * Created by Edge on 6/15/2017.
 */

import * as TYPES from './constants';

const initialState = {
  requesting: false,
  successful: false,
  messages: {},
  errors: {}
};

function passwordResetReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.PASSWORD_RESET_REQUEST:
      console.log('request handled by reducer');
      return Object.assign({}, state, {"requesting": true, "successful": false});
    case TYPES.PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        "requesting": false,
        "successful": true,
        "messages": action.user
      });
    case TYPES.PASSWORD_RESET_ERROR:
      console.log('password-reset-error',action);
      return Object.assign({}, state,
        {"requesting": false, "successful": false, "errors": action.error});
    case TYPES.NEW_PASSWORD_REQUEST:
      return Object.assign({}, state, {"requesting": true, "successful": false});
    case TYPES.NEW_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        "requesting": false,
        "successful": true,
        "messages": action
      });
    case TYPES.NEW_PASSWORD_ERROR:
      console.log('new-password-error',action);
      return Object.assign({}, state,
        {"requesting": false, "successful": false, "errors": action.error});
    default:
      return state;
  }
}

export default passwordResetReducer;
