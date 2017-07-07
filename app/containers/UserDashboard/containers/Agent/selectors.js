import { createSelector } from "reselect";

export const selectAgentApplication = () => state => {
  return state.getIn(["agentApplicationReducer", "agents"]);
};
export const selectAgentApplicationResponse = () => state => {
  return state.getIn(["agentApplicationReducer", "response"]);
};
export const selectAgentApplicationError = () => state => {
  return state.getIn(["agentApplicationReducer", "errors"]);
};
