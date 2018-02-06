import { SET_LOGIN_STATUS, VALIDATE_USER } from "../../constants";

export const setLoginStatus = status => ({
  type: SET_LOGIN_STATUS,
  payload: status
});

export const setUserValidation = isValid => ({
  type: VALIDATE_USER,
  payload: isValid
});
