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

import Editor from "./Editor";

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={Editor} />
          <Route path="/:id" component={Editor} {...this.props} />
        </div>
      </Router>
    );
  }
}
