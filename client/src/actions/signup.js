import server from "./../api/server";

export default function attemptSignup(credentialsInput) {
  return async function (dispatch, getState) {
    const credentials = { ...credentialsInput };
    try {
      const response = await server.post("/users/create", credentials);
      console.log(response);
      const userInfo = response.data.user;
      console.log(userInfo);
      dispatch({ type: "USER_LOGGED_IN", userInfo });
    } catch (err) {
      console.error(err);
    }
  };
}
