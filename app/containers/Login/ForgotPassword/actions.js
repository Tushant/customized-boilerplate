/**
 * Created by Edge on 6/15/2017.
 */
import * as TYPES from "./constants";

export function forgotPasswordRequest(data) {
  return {
    type: TYPES.FORGOT_PASSWORD_REQUEST,
    data
  };
}

export function forgotPasswordSuccess(user) {
  return {
    type: TYPES.FORGOT_PASSWORD_SUCCESS,
    user
  };
}

export function forgotPasswordError(error) {
  return {
    type: TYPES.FORGOT_PASSWORD_ERROR,
    error
  };
}
