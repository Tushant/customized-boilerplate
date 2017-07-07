import { createSelect } from "reselect";

export const selectReferredAgentResponse = () => state =>
  state.getIn(["agentReferralReducer", "response"]);

// export const selectReferredAgent = () => state => {
//   console.log("reffered agent state", state.toJS());
//   return state.getIn(["agentReferralReducer", "response"]);
// };
