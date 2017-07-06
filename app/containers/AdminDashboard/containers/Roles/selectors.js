import { createSelector } from "reselect";

export const selectRoles = () => state => {
  console.log("state", state.toJS());
  return state.getIn(["roles", "role"]);
};
