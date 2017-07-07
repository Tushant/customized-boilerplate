import {
  CLOUDINARY_SETUP_REQUEST,
  CLOUDINARY_SETUP_SUCCESS,
  CLOUDINARY_SETUP_FAILURE,
  CLOUDINARY_FETCH_REQUEST,
  CLOUDINARY_FETCH_SUCCESS,
  CLOUDINARY_FETCH_FAILURE
} from "./constants";

export function cloudinaryRequest(data) {
  console.log("data", data);
  return {
    type: CLOUDINARY_SETUP_REQUEST,
    data
  };
}

export function cloudinarySuccess(cloudinary) {
  return {
    type: CLOUDINARY_SETUP_SUCCESS,
    cloudinary
  };
}

export function cloudinaryFailure(error) {
  return {
    type: CLOUDINARY_SETUP_FAILURE,
    error
  };
}

export function fetchCloudinary() {
  return {
    type: CLOUDINARY_FETCH_REQUEST
  };
}

export function cloudinaryFetched(cloudinary) {
  return {
    type: CLOUDINARY_FETCH_SUCCESS,
    cloudinary
  };
}

export function cloudinaryFetchingError(error) {
  return {
    type: CLOUDINARY_FETCH_FAILURE,
    error
  };
}
