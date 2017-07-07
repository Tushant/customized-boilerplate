import { createSelector } from "reselect";

export const selectUsers = () => state => state.getIn(["userReducer", "users"]);

export const selectUserResponse = () => state =>
  state.getIn(["userReducer", "response"]);

export const selectUserID = () => (_, props) => {
  try {
    // Search in props.params set by router.
    return props.match.params.id;
  } catch (e) {
    // Search in props (set by parent component.)
    console.log("props", props);
    return props.user._id;
  }
};

export const selectUser = () =>
  createSelector([selectUsers(), selectUserID()], (users, userId) => {
    return users.find(user => {
      const isObject = typeof user === "object";
      if (!isObject) {
        return false;
      }
      return user.get("_id") === userId;
    });
  });
