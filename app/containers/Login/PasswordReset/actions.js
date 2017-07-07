/**
 * Created by Edge on 6/15/2017.
 */
import * as TYPES from "./constants";

export function passwordResetRequest(data) {
  return {
    type: TYPES.PASSWORD_RESET_REQUEST,
    data
  };
}

export function passwordResetSuccess(user) {
  return {
    type: TYPES.PASSWORD_RESET_SUCCESS,
    user
  };
}

export function passwordResetError(error) {
  return {
    type: TYPES.PASSWORD_RESET_ERROR,
    error
  };
}

export function newPasswordRequest(data) {
  return {
    type: TYPES.NEW_PASSWORD_REQUEST,
    data: data.password,
    token: data.token
  };
}

export function newPasswordSuccess(data) {
  return {
    type: TYPES.NEW_PASSWORD_SUCCESS,
    data
  };
}

export function newPasswordError(error) {
  return {
    type: TYPES.NEW_PASSWORD_ERROR,
    error
  };
}
