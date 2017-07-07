import {
  ROLES_FETCH_REQUEST,
  ROLES_FETCH_SUCCESS,
  ROLES_FETCH_FAILURE
} from "./constants";

import action from "utils/action";

export const fetchRoles = action(ROLES_FETCH_REQUEST);
export const rolesFetched = action(ROLES_FETCH_SUCCESS, "roles");
export const rolesFetchingFailure = action(ROLES_FETCH_FAILURE, "error");
