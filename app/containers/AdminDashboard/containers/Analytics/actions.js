import {
  ANALYTICS_FETCH_REQUEST,
  ANALYTICS_FETCH_SUCCESS,
  ANALYTICS_FETCH_FAILURE,
  ANALYTICS_SETUP_REQUEST,
  ANALYTICS_SETUP_SUCCESS,
  ANALYTICS_SETUP_FAILURE
} from "./constants";

export function fetchAnalytics() {
  return {
    type: ANALYTICS_FETCH_REQUEST
  };
}

export function analyticsFetched(analytics) {
  console.log("analytics", analytics);
  return {
    type: ANALYTICS_FETCH_SUCCESS,
    analytics
  };
}

export function analyticsFetchingError(error) {
  return {
    type: ANALYTICS_FETCH_FAILURE,
    error
  };
}

export function analyticsRequest(data) {
  return {
    type: ANALYTICS_SETUP_REQUEST,
    data
  };
}

export function analyticsSuccess(analytics) {
  return {
    type: ANALYTICS_SETUP_SUCCESS,
    analytics
  };
}

export function analyticsFailure(error) {
  return {
    type: ANALYTICS_SETUP_FAILURE,
    error
  };
}
