import { createSelector } from "reselect";

export const selectLoginRequest = () => state => {
  return state.get("login");
};
