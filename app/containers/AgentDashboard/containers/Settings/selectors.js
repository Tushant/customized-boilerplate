import { createSelector } from "reselect";

export const selectMyProfile = () => state =>
  state.getIn(["agentSettingsReducer", "myProfile"]);
