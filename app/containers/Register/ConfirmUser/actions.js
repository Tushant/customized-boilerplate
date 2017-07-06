/**
 * Created by Edge on 6/15/2017.
 */
import * as TYPES from "./constants";

export function confirmUserRequestBasic(userId) {
  return function(dispatch) {
    dispatch({
      type: TYPES.CONFIRM_USER_REQUEST,
      data: userId
    });
    fetch(`http://localhost:3000/api/confirm/user/${userId}`)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: TYPES.CONFIRM_USER_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: TYPES.CONFIRM_USER_ERROR,
          payload: err
        })
      });
  };
}

export function confirmUserRequest(data) {
  return {
    type: TYPES.CONFIRM_USER_REQUEST,
    data
  };
}

export function confirmUserSuccess(user) {
  return {
    type: TYPES.CONFIRM_USER_SUCCESS,
    user
  };
}

export function confirmUserError(error) {
  return {
    type: TYPES.CONFIRM_USER_ERROR,
    error
  };
}

export function resendConfirmationRequest() {
  return {
    type: TYPES.RESEND_CONFIRMATION_REQUEST
  }
}

export function resendConfirmationSuccess(message) {
  return {
    type: TYPES.RESEND_CONFIRMATION_SUCCESS,
    message
  }
}

export function resendConfirmationError(error) {
  return {
    type: TYPES.RESEND_CONFIRMATION_ERROR,
    error
  }
}
