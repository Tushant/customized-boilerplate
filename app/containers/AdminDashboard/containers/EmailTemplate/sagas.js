import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  emailTemplateSuccess,
  emailTemplateFailure,
  emailTemplateFetched,
  emailTemplateFetchedByID,
  emailTemplateFetchingError
} from "./actions";
import {
  EMAIL_TEMPLATE_REQUEST,
  EMAIL_TEMPLATE_SUCCESS,
  EMAIL_TEMPLATE_FAILURE,
  EMAIL_TEMPLATE_FETCH_REQUEST,
  EMAIL_TEMPLATE_FETCH_REQUEST_BY_ID
} from "./constants";

import { selectemailTemplate } from "./selectors";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnSuccess() {
  const action = yield take(EMAIL_TEMPLATE_SUCCESS);
  yield put(push("/admin/dashboard"));
}

function* fetchemailTemplate(action) {  const token = JSON.parse(localStorage.getItem("user"))["token"];

  yield call(
    XcelTrip.get(
      "api/configuration/email-template",
      emailTemplateFetched,
      emailTemplateFetchingError,
      token
    )
  );
}

function* fetchemailTemplateByID(action) {
    const token = JSON.parse(localStorage.getItem("user"))["token"];

  yield call(
    XcelTrip.get(
      `api/configuration/email-template/${action.id}`,
      emailTemplateFetchedByID,
      emailTemplateFetchingError,
      token
    )
  );
}

function* setupemailTemplate(action) {
  // const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    XcelTrip.put(
      `api/configuration/email-template/${action.data._id}`,
      emailTemplateSuccess,
      emailTemplateFailure,
      action.data
    )
  );
  // yield take([LOCATION_CHANGE, EMAIL_TEMPLATE_FAILURE]);
  // yield cancel(successWatcher);
}

function* emailTemplateWatcher() {
  yield takeLatest(EMAIL_TEMPLATE_REQUEST, setupemailTemplate);
  yield takeLatest(EMAIL_TEMPLATE_FETCH_REQUEST, fetchemailTemplate);
  yield takeLatest(EMAIL_TEMPLATE_FETCH_REQUEST_BY_ID, fetchemailTemplateByID);
}

export default [emailTemplateWatcher];
