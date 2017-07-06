import { fromJS } from "immutable";
import {
  CLOUDINARY_SETUP_REQUEST,
  CLOUDINARY_SETUP_SUCCESS,
  CLOUDINARY_SETUP_FAILURE,
  CLOUDINARY_FETCH_REQUEST,
  CLOUDINARY_FETCH_SUCCESS,
  CLOUDINARY_FETCH_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  cloudinary: {},
  error: null
});

function cloudinaryState(state = initialState, action) {
  switch (action.type) {
    case CLOUDINARY_SETUP_REQUEST:
    case CLOUDINARY_FETCH_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case CLOUDINARY_SETUP_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("cloudinary", fromJS(action.cloudinary.data));
    case CLOUDINARY_FETCH_SUCCESS:
      return state
        .set("requesting", false)
        .set("successful", true)
        .set("cloudinary", fromJS(action.cloudinary.data));
    case CLOUDINARY_SETUP_FAILURE:
    case CLOUDINARY_FETCH_FAILURE:
      return state.set("error", action.error);
    default:
      return state;
  }
}

export default cloudinaryState;
