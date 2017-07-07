import {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from "./constants";

import action from "utils/action";

export function loadUsers() {
  return {
    type: LOAD_USER
  };
}

export function userLoaded(users) {
  return {
    type: LOAD_USER_SUCCESS,
    users
  };
}

export function userLoadingError(error) {
  return {
    type: LOAD_USER_FAILURE,
    error
  };
}

export function deleteUser(userId) {
  console.log("userId", userId);
  return {
    type: DELETE_USER,
    userId
  };
}

export function userDeleted(response, userId) {
  return {
    type: DELETE_USER_SUCCESS,
    response,
    userId
  };
}

export function userDeletingError(error) {
  return {
    type: DELETE_USER_FAILURE,
    error
  };
}

export const updateUser = action(UPDATE_USER, "user");
export const userUpdated = action(UPDATE_USER_SUCCESS, "response", "user");
export const userUpdatingError = action(UPDATE_USER_FAILURE, "error");
