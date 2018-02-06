import { combineReducers } from "redux";
//import app from "./app/reducer"
import user from "./user/reducer";

// Clone of initial state to be returned when user logs out
const appReducer = combineReducers({
  user,
});

// Logic to return intial state if action is LOG_OUT
export default (state, action) => {
  if (action.type === "LOG_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const getUser = state => state.user;