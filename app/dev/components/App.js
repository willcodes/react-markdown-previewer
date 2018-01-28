import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
  browserHistory
} from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Editor from "./Editor";
import Login from "./Login";

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={Editor} />
            <Route path="/pads/:id" component={Editor} {...this.props} />
            <Route path="/login" component={Login} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
