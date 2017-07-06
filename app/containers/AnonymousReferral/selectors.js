import { createSelect } from "reselect";

export const selectAnonymousAgentResponse = () => state =>
  state.getIn(["anonymousAgentReducer", "response"]);

// export const selectReferredAgent = () => state => {
//   console.log("reffered agent state", state.toJS());
//   return state.getIn(["agentReferralReducer", "response"]);
// };
