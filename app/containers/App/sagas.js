import React from "react";
import { request, requestJSON } from "utils/request";
import {
  takeLatest,
  take,
  call,
  put,
  fork,
  cancel,
  select
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "containers/Login/constants";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR
} from "containers/Login/ForgotPassword/constants";
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError
} from "containers/Login/ForgotPassword/actions";
import {
  loginSuccess,
  loginError,
  logoutSuccess,
  logoutFailure
} from "containers/Login/actions";
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "containers/Register/constants";
import {
  RESEND_CONFIRMATION_REQUEST,
  RESEND_CONFIRMATION_SUCCESS,
  RESEND_CONFIRMATION_ERROR
} from "containers/Register/ConfirmUser/constants";
import {
  resendConfirmationSuccess,
  resendConfirmationError
} from "containers/Register/ConfirmUser//actions";

import { signupSuccess, signupError } from "containers/Register/actions";
import { selectUser } from "containers/App/selectors";
import Login from "containers/Login";

import {
  loadInitialDataSuccess,
  loadInitialDataError,
  showDialog,
  loadUserProfileSuccess
} from "containers/App/actions";

import {
  API_BASE,
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  LOAD_USER_PROFILE_SUCCESS
} from "containers/App/constants";

export class XcelTrip {
  /**
   * Generic api data loader
   */
  static dataLoader(apiUri, onSuccess, onError, data, ...actionArguments) {
    return function*() {
      // eslint-disable-line func-names
      const requestURL = `${API_BASE}${apiUri}`;
      const usertoken =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"))["token"];
      const token = actionArguments[0];
      // const isMultipartFile = actionArguments[1] && actionArguments[1];
      console.log("apiUri", requestURL);
      // "Content-Type": isMultipartFile ? "multipart/form-data" : "application/json";
      try {
        let options;
        if (data !== undefined) {
          // If we have data to post
          const stringifiedData = JSON.stringify(data);
          options = {
            method: data._id ? "PUT" : "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "*",
              Authorization: data._id ? `${usertoken}` : `${token}`
            }
          };
        } else {
          options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "*",
              Authorization: `${token}`
            }
          };
        }
        const response = yield call(requestJSON, requestURL, options);
        console.log("response", response);
        yield put(onSuccess(response, ...actionArguments));
      } catch (e) {
        let error = null;
        try {
          error = yield call(() => e.response.json());
        } catch (_) {
          error = {
            errors: [
              {
                code: e.response.status,
                msg: e.response.statusText
              }
            ]
          };
        }
        yield put(onError(error, ...actionArguments));
      }
    };
  }

  static get(apiUri, onSuccess, onError, ...actionArguments) {
    return this.dataLoader(
      apiUri,
      onSuccess,
      onError,
      undefined,
      ...actionArguments
    );
  }

  /*
   * Shorthand POST function
   */
  static post(apiUri, onSuccess, onError, data, ...actionArguments) {
    return this.dataLoader(
      apiUri,
      onSuccess,
      onError,
      data,
      ...actionArguments
    );
  }

  static put(apiUri, onSuccess, onError, data, ...actionArguments) {
    return this.dataLoader(
      apiUri,
      onSuccess,
      onError,
      data,
      ...actionArguments
    );
  }

  static patch(apiUri, onSuccess, onError, ...actionArguments) {
    return function*() {
      // eslint-disable-line func-names
      const requestURL = `${API_BASE}${apiUri}`;
      const token = JSON.parse(localStorage.getItem("user"))["token"];
      try {
        // Call our request helper (see 'utils/request')
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `${token}`
          }
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response, actionArguments));
        // yield call(request, requestURL, options);
        // yield put(onSuccess(actionArguments));
      } catch (e) {
        let error = null;
        try {
          error = yield call(() => e.response.json());
        } catch (_) {
          error = {
            errors: [
              {
                code: e.response.status,
                msg: e.response.statusText
              }
            ]
          };
        }
        yield put(onError(error, ...actionArguments));
      }
    };
  }

  static delete(apiUri, onSuccess, onError, ...actionArguments) {
    return function*() {
      // eslint-disable-line func-names
      const requestURL = `${API_BASE}${apiUri}`;
      const token = JSON.parse(localStorage.getItem("user"))["token"];
      try {
        // Call our request helper (see 'utils/request')
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `${token}`
          }
        };
        const response = yield call(request, requestURL, options);
        yield put(onSuccess(response, actionArguments));
        // yield call(request, requestURL, options);
        // yield put(onSuccess(actionArguments));
      } catch (e) {
        let error = null;
        try {
          error = yield call(() => e.response.json());
        } catch (_) {
          error = {
            errors: [
              {
                code: e.response.status,
                msg: e.response.statusText
              }
            ]
          };
        }
        yield put(onError(error, ...actionArguments));
      }
    };
  }
}

function* redirectOnSuccess() {
  const action = yield take(LOGIN_SUCCESS);
  const user = yield select(selectUser());
  const userInfo = user.get("userInfo");

  if (userInfo["user_role"].indexOf("agent") !== -1) {
    yield put(push("agent/dashboard/home"));
  } else if (userInfo["user_role"].indexOf("hoteladmin") !== -1) {
    yield put(push("hotel/dashboard/home"));
  } else if (userInfo["user_role"].indexOf("superadmin") !== -1) {
    yield put(push("admin/dashboard/home"));
  } else if (userInfo["user_role"].indexOf("enduser") !== -1) {
    yield put(push("user/dashboard/home"));
  }
}

function* redirectOnSignupSuccess() {
  const action = yield take(SIGNUP_SUCCESS);
  yield put(showDialog(<Login />));
}
function* redirectOnLogoutSuccess() {
  const action = yield take(LOGOUT_SUCCESS);
  yield put(push("/"));
}
function* signupFlow(action) {
  const successWatcher = yield fork(redirectOnSignupSuccess);
  yield fork(
    XcelTrip.post("api/user/data", signupSuccess, signupError, action.data)
  );
  yield take([LOCATION_CHANGE, SIGNUP_ERROR]);
  yield cancel(successWatcher);
}

function* loginFlow(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(XcelTrip.post("api/login", loginSuccess, loginError, action.data));
  yield take([LOCATION_CHANGE, LOGIN_FAILURE]);
  yield cancel(successWatcher);
}
function* logoutUser() {
  const successWatcher = yield fork(redirectOnLogoutSuccess);
  yield fork(XcelTrip.delete("api/user/logout", logoutSuccess, logoutFailure));
  yield take([LOCATION_CHANGE, LOGOUT_FAILURE]);
  yield cancel(successWatcher);
}
function* redirectOnForgotPasswordSuccess() {
  const action = yield take(FORGOT_PASSWORD_SUCCESS);
  yield put(push(`/`));
}
function* forgotPasswordFlow(action) {
  const successWatcher = yield fork(redirectOnForgotPasswordSuccess);
  yield call(
    XcelTrip.put(
      "api/user/security-settings/reset-password-link",
      forgotPasswordSuccess,
      forgotPasswordError,
      action.data
    )
  );
  yield call(
    XcelTrip.post(
      "api/user/security-settings/reset-password-link",
      forgotPasswordSuccess,
      forgotPasswordError,
      action.data
    )
  );
  yield take([LOCATION_CHANGE, FORGOT_PASSWORD_ERROR]);
  yield cancel(successWatcher);
}

function* resendConfirmationFlow() {
  const successWatcher = yield fork(redirectOnSuccess);
  yield call(
    XcelTrip.post(
      `api/user/resend-confirm-email`,
      resendConfirmationSuccess,
      resendConfirmationError,
      {},
      localStorage.getItem("token")
    )
  );
  yield take([LOCATION_CHANGE, RESEND_CONFIRMATION_ERROR]);
  yield cancel(successWatcher);
}

function* loadInitialData(action) {
  console.log("action");
  // const token = JSON.parse(localStorage.getItem("user"))["token"];
  // TODO - should we go with jsonwebtoken or other alternative?
  // if (!token) {
  //   yield put(showDialog(<Login />));
  // }
  // yield call(
  //   XcelTrip.get(`api/user/data/`, loadUserProfileSuccess, loadInitialDataError)
  // );
}

function* initialize() {
  const watcher = yield fork(loadInitialData);
  yield take([INITIALIZE_ERROR, INITIALIZE_SUCCESS]);
  yield cancel(watcher);
}

function* rootSaga() {
  yield takeLatest(INITIALIZE, initialize);
  yield takeLatest(LOGIN_REQUEST, loginFlow);
  yield takeLatest(LOGOUT, logoutUser);
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordFlow);
  // yield takeLatest(LOAD_USER_PROFILE_SUCCESS, loadUserProfile);
  yield takeLatest(RESEND_CONFIRMATION_REQUEST, resendConfirmationFlow);
}

export default [rootSaga];
