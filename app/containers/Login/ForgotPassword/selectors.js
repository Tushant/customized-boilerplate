import { createSelector } from "reselect";

const selectForgotPasswordRequest = () => state => {
  return state.get("forgotPassword");
};

export { selectForgotPasswordRequest };
