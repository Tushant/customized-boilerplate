import { createSelector } from "reselect";

export const selectEmailTemplate = () => state =>
  state.getIn(["emailTemplate", "emailTemplate"]);

export const selectEmailTemplateByID = () => state =>
  state.getIn(["emailTemplate", "templateDetail"]);
