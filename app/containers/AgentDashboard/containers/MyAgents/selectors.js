import { createSelector } from "reselect";

export const selectMyAgents = () => state => {
  return state.getIn(["myAgentsReducer", "myAgents"]);
};

export const selectReferredAgentResponse = () => state =>
  state.getIn(["agentReferralReducer", "response"]);

export const selectAgentID = () => (_, props) => {
  try {
    return props.match.params.id;
  } catch (e) {
    if (props.agent._id) {
      return props.agent._id;
    } else {
      console.log(
        "localStorage",
        JSON.parse(localStorage.getItem("user"))["userInfo"]["_id"]
      );
      return JSON.parse(localStorage.getItem("user"))["userInfo"]["_id"];
    }
  }
};

export const selectAgent = () =>
  createSelector([selectMyAgents(), selectAgentID()], (agents, agentId) => {
    console.log("agent ko id", agents.toJS());
    return agents.find(agent => {
      const isObject = typeof agent === "object";
      if (!isObject) {
        return false;
      }
      console.log("agent getin", agent.getIn(["user_info", "_id"]));
      return agent.getIn(["user_info", "_id"]) === agentId;
    });
  });
