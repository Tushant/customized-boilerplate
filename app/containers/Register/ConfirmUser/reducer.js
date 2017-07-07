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

export function confirmUserReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.CONFIRM_USER_REQUEST:
      console.log('confirm-user-request',action);
      return Object.assign({}, ...state, {requesting: true});
    case TYPES.CONFIRM_USER_SUCCESS:
      console.log('confirm-user-success',action);
      return Object.assign({}, ...state, {
        requesting: false,
        successful: true
      });
    case TYPES.CONFIRM_USER_ERROR:
      console.log('confirm-user-error',action);
      return Object.assign({}, ...state, {
        requesting: false,
        successful: false
      });
    default:
      return state;
  }
}

export default confirmUserReducer;
