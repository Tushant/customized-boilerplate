import {
  COMMISSION_FETCH_REQUEST,
  COMMISSION_FETCH_SUCCESS,
  COMMISSION_FETCH_FAILURE,
  COMMISSION_SETUP_REQUEST,
  COMMISSION_SETUP_SUCCESS,
  COMMISSION_SETUP_FAILURE
} from "./constants";

export function fetchCommission() {
  return {
    type: COMMISSION_FETCH_REQUEST
  };
}

export function commissionFetched(commission) {
  return {
    type: COMMISSION_FETCH_SUCCESS,
    commission
  };
}

export function commissionFetchingFailure(error) {
  return {
    type: COMMISSION_FETCH_FAILURE,
    error
  };
}

export function commissionRequest(data) {
  return {
    type: COMMISSION_SETUP_REQUEST,
    data
  };
}

export function commissionSuccess(commission) {
  return {
    type: COMMISSION_SETUP_SUCCESS,
    commission
  };
}

export function commissionFailure(error) {
  return {
    type: COMMISSION_SETUP_FAILURE,
    error
  };
}
