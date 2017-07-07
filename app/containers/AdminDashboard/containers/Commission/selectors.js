import { createSelector } from "reselect";

export const selectCommission = () => state => {
  return state.getIn(["commission", "commission"]);
};
