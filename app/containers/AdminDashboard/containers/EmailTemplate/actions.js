import {
  EMAIL_TEMPLATE_REQUEST,
  EMAIL_TEMPLATE_SUCCESS,
  EMAIL_TEMPLATE_FAILURE,
  EMAIL_TEMPLATE_FETCH_REQUEST,
  EMAIL_TEMPLATE_FETCH_SUCCESS,
  EMAIL_TEMPLATE_FETCH_FAILURE,
  EMAIL_TEMPLATE_FETCH_REQUEST_BY_ID,
  EMAIL_TEMPLATE_FETCH_SUCCESS_BY_ID
} from "./constants";

export function emailTemplateRequest(data) {
  console.log("data", data);
  return {
    type: EMAIL_TEMPLATE_REQUEST,
    data
  };
}

export function emailTemplateSuccess(emailTemplate) {
  return {
    type: EMAIL_TEMPLATE_SUCCESS,
    emailTemplate
  };
}

export function emailTemplateFailure(error) {
  return {
    type: EMAIL_TEMPLATE_FAILURE,
    error
  };
}

export function fetchEmailTemplate() {
  return {
    type: EMAIL_TEMPLATE_FETCH_REQUEST
  };
}

export function fetchEmailTemplateByID(id) {
  return {
    type: EMAIL_TEMPLATE_FETCH_REQUEST_BY_ID,
    id
  };
}

export function emailTemplateFetched(emailTemplate) {
  console.log("emailTemplate", emailTemplate);
  return {
    type: EMAIL_TEMPLATE_FETCH_SUCCESS,
    emailTemplate
  };
}

export function emailTemplateFetchedByID(templateDetail) {
  return {
    type: EMAIL_TEMPLATE_FETCH_SUCCESS_BY_ID,
    templateDetail
  };
}

export function emailTemplateFetchingError(error) {
  return {
    type: EMAIL_TEMPLATE_FETCH_FAILURE,
    error
  };
}
