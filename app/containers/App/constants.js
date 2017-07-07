export const INITIALIZE = "XcelTrip/App/INITIALIZE";
export const INITIALIZE_SUCCESS = "XcelTrip/App/INITIALIZE_SUCCESS";
export const INITIALIZE_ERROR = "XcelTrip/App/INITIALIZE_ERROR";
export const LOAD_USER_PROFILE_SUCCESS =
  "XcelTrip/App/LOAD_USER_PROFILE_SUCCESS";
export const SHOW_DIALOG = "XcelTrip/App/SHOW_DIALOG";
export const CLIENT_SET = "XcelTrip/App/CLIENT_SET";
export const CLIENT_UNSET = "XcelTrip/App/CLIENT_UNSET";

export const API_BASE = process.env.NODE_ENV === "production"
  ? "http://138.197.65.200:4000/"
  : "http://138.197.65.200:4000/";

export const DEFAULT_LOCALE = "en";
