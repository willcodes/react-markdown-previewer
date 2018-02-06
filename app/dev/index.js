import React from "react";
import ReactDOM from "react-dom";
// import TextData from './components/TextData';
import AppRouter from "./routes/AppRouter";
import store from "./store/index";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("app")
);
