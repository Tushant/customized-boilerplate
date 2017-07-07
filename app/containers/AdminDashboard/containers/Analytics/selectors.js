import { createSelector } from "reselect";

export const selectAnalytics = () => state =>
  state.getIn(["analytics", "analytics"]);
