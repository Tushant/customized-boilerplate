import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";

// export function signupRequest({ first_name, last_name, email, password }) {
//   return {
//     type: SIGNUP_REQUESTING,
//     first_name,
//     last_name,
//     email,
//     password
//   };
// }

export function signupRequest(data) {
  console.log("data signup", data);
  return {
    type: SIGNUP_REQUESTING,
    data
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error
  };
}
