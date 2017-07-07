import {
  LOAD_MY_PROFILE,
  UPDATE_PROFILE,
  LOAD_MY_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  LOAD_MY_PROFILE_FAILURE,
  UPDATE_PROFILE_FAILURE
} from "./constants";

import action from "utils/action";

export const loadMyProfile = action(LOAD_MY_PROFILE);
export const myProfileLoaded = action(LOAD_MY_PROFILE_SUCCESS, "myProfile");
export const myProfileLoadingFailure = action(LOAD_MY_PROFILE_FAILURE, "error");

export const updateProfile = action(UPDATE_PROFILE, "agentId", "profile");
export const profileUpdated = action(
  UPDATE_PROFILE_SUCCESS,
  "profile",
  "response"
);
export const profileUpdatingFailure = action(UPDATE_PROFILE_FAILURE, "error");
