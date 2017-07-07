/**
 * The global state selectors
 */

import { createSelector } from "reselect";

const selectGlobal = state => {
  return state.get("global");
};

const selectUser = state => {
  return state.get("login");
};

const selectRoute = state => state.get("route");

export const selectInitialize = () => state =>
  state.getIn(["global", "initialized"]);

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get("location").toJS());

const makeSelectUser = () =>
  createSelector(selectUser, userState => userState.get("userInfo"));

const makeSelectDialog = () =>
  createSelector(selectGlobal, globalState => globalState.get("dialog"));

const selectHome = () => state => state.get("home");

export {
  selectGlobal,
  makeSelectDialog,
  makeSelectUser,
  makeSelectLocation,
  selectHome,
  selectUser
};
