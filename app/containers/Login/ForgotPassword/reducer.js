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

function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {"requesting": true, "successful": false});
    case TYPES.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        "requesting": false,
        "successful": true,
        "messages": action.user,
        "errors": {}
      });
    case TYPES.FORGOT_PASSWORD_ERROR:
      console.log('forgot-password-error',action);
      return Object.assign({}, state, {
        "requesting": false,
        "successful": false,
        "messages": {},
        "errors": action.error
      });
    default:
      return state;
  }
}

export default forgotPasswordReducer;
