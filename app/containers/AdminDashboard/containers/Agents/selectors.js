import { createSelector } from "reselect";

export const selectAgents = () => state => {
  console.log("agent", state.toJS());
  return state.getIn(["agentReducer", "agents"]);
};

export const selectAgentResponse = () => state =>
  state.getIn(["agentReducer", "response"]);

export const selectAgentID = () => (_, props) => {
  try {
    return props.match.params.id;
  } catch (e) {
    if (props.agent._id) {
      console.log("props.agent._id", props.agent._id);
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
  createSelector([selectAgents(), selectAgentID()], (agents, agentId) => {
    console.log("agent ko id", agents);
    return agents.find(agent => {
      const isObject = typeof agent === "object";
      if (!isObject) {
        return false;
      }
      return agent.get("_id") === agentId;
    });
  });
