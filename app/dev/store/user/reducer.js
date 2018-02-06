import { combineReducers } from "redux";
import { SET_LOGIN_STATUS, VALIDATE_USER } from "../../constants";

const status = (state = defaultStatus, action) => {
  switch (action.type) {
    case VALIDATE_USER:
      return {
        ...state,
        isLoading: false,
        userValidated: action.payload
      };

    case SET_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload
      };

    default:
      return state;
  }
};

export default combineReducers({
  status
});
