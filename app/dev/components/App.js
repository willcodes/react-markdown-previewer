import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Editor from "./Editor";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route>
          <Editor />
        </Route>
      </Router>
    );
  }
}
