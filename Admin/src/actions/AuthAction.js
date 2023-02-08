import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });

    navigate("/home", { replace: true });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const NewBN = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "CREATE_NEW_BN_BEGIN" });
  try {
    const { data } = await AuthApi.CreateAdmin(formData);
    dispatch({ type: "CREATE_NEW_BN_SUCCESS", data: data });
    navigate("/team", { replace: true });
  } catch (error) {
     dispatch({ type: "CREATION_FAILED" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
