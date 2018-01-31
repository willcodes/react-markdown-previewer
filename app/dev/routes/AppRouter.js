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
import Editor from "../components/Editor";
import LoginContainer from "../containers/LoginContainer";
import SignUpContainer from "../containers/SignUpContainer";

export default class AppRouter extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={Editor} />
            <Route path="/pads/:id" component={Editor} {...this.props} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignUpContainer} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
