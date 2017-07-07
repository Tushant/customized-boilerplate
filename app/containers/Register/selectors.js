import { createSelector } from "reselect";

const selectSignupRequest = () => state => {
  return state.get("signup");
};

export { selectSignupRequest };
