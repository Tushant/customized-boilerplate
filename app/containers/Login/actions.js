/*
 *
 * Login actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "./constants";

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function logoutSuccess(response) {
  return {
    type: LOGOUT_SUCCESS,
    response
  };
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error
  };
}
