import { createSelector } from "reselect";

export const selectLogsLoadingState = () => state =>
  state.getIn(["logs", "requesting"]);

export const selectLogs = () => state => state.getIn(["logs", "logs"]);
