import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
const { logger } = require(`redux-logger`);

const middlewares = [thunk, logger];

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);
//   middlewares.push(logger);
// }

const initialState = {};
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
);

export default store;
