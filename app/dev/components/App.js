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

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <div>
            <Route exact path="/" component={Editor} />
            <Route path="/:id" component={Editor} {...this.props} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
