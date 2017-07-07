import { createSelector } from "reselect";

const selectPasswordResetRequest = () => state => {
  return state.get("passwordReset");
};

export { selectPasswordResetRequest };
