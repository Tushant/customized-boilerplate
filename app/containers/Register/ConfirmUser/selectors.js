import { createSelector } from "reselect";

const selectConfirmUserRequest = () => state => {
  return state.get("confirmUser");
};

export { selectConfirmUserRequest };
