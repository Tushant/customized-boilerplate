import {
  EMAIL_SERVICE_SETUP_REQUEST,
  EMAIL_SERVICE_SETUP_SUCCESS,
  EMAIL_SERVICE_SETUP_FAILURE,
  EMAIL_SERVICE_FETCH_REQUEST,
  EMAIL_SERVICE_FETCH_SUCCESS,
  EMAIL_SERVICE_FETCH_FAILURE
} from "./constants";

export function emailServiceRequest(data) {
  console.log("data", data);
  return {
    type: EMAIL_SERVICE_SETUP_REQUEST,
    data
  };
}

export function emailServiceSuccess(emailService) {
  return {
    type: EMAIL_SERVICE_SETUP_SUCCESS,
    emailService
  };
}

export function emailServiceFailure(error) {
  return {
    type: EMAIL_SERVICE_SETUP_FAILURE,
    error
  };
}

export function fetchEmailService() {
  return {
    type: EMAIL_SERVICE_FETCH_REQUEST
  };
}

export function emailServiceFetched(emailService) {
  console.log("emailService", emailService);
  return {
    type: EMAIL_SERVICE_FETCH_SUCCESS,
    emailService
  };
}

export function emailServiceFetchingError(error) {
  return {
    type: EMAIL_SERVICE_FETCH_FAILURE,
    error
  };
}
