import { createSelector } from "reselect";

export const selectEmailService = () => state =>
  state.getIn(["emailService", "emailService"]);
