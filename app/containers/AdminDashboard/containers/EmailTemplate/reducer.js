import { fromJS } from "immutable";
import {
  EMAIL_TEMPLATE_REQUEST,
  EMAIL_TEMPLATE_SUCCESS,
  EMAIL_TEMPLATE_FAILURE,
  EMAIL_TEMPLATE_FETCH_REQUEST,
  EMAIL_TEMPLATE_FETCH_REQUEST_BY_ID,
  EMAIL_TEMPLATE_FETCH_SUCCESS,
  EMAIL_TEMPLATE_FETCH_SUCCESS_BY_ID,
  EMAIL_TEMPLATE_FETCH_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  emailTemplate: {},
  templateDetail: {},
  error: null
});

function emailTemplateState(state = initialState, action) {
  switch (action.type) {
    case EMAIL_TEMPLATE_REQUEST:
    case EMAIL_TEMPLATE_FETCH_REQUEST:
    case EMAIL_TEMPLATE_FETCH_REQUEST_BY_ID:
      return state.set("requesting", true).set("successful", false);
    case EMAIL_TEMPLATE_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("emailTemplate", fromJS(action.emailTemplate.data));
    case EMAIL_TEMPLATE_FETCH_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("emailTemplate", fromJS(action.emailTemplate.data));
    case EMAIL_TEMPLATE_FETCH_SUCCESS_BY_ID:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("templateDetail", fromJS(action.templateDetail.data));
    case EMAIL_TEMPLATE_FAILURE:
    case EMAIL_TEMPLATE_FETCH_FAILURE:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default emailTemplateState;
