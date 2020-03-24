export function signInRequest(id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function signInSuccess(token, student) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, student },
  };
}

// export function signUpRequest(id) {
//   return {
//     type: '@auth/SIGN_UP_REQUEST',
//     payload: { id },
//   };
// }

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
