import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Paper from 'material-ui/Paper';
import { orange500, blue900 } from "material-ui/styles/colors";
import { Link } from "react-router-dom";

const inputStyles = {
  errorStyle: {
    color: "red"
  },
  underlineStyle: {
    borderColor: blue900
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue900
  },
};



export default class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleOnChange = e => {
    const target = e.target;
    const value = target.value;
    const key = target.name;

    this.setState(
      {
        [key]: value
      }
    );
  };

  handleOnClick = (e) => {
    const { username, password } = this.state;
    e.preventDefault();
    this.props.handleLogin({ username, password });
  }

  render() {

    const { username, password } = this.state;

    return (
      <div className="container">
        <Paper
          zDepth={2}
          className="login-container"
        >
          <h2>Markdown Pad Login</h2>
          <TextField
            floatingLabelText="Username"
            name="username"
            value={username}
            errorText={username.length > 0 ? null : "Please enter your username"}
            onChange={this.handleOnChange}
            underlineFocusStyle={{ borderColor: "#364459" }}
            floatingLabelFocusStyle={{ color: "#7589a3" }}
            fullWidth={true}
          />
          <br />
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            value={password}
            errorText={password.length > 0 ? null : "Please enter your password"}
            onChange={this.handleOnChange}
            underlineFocusStyle={{ borderColor: "#364459" }}
            floatingLabelFocusStyle={{ color: "#7589a3" }}
            fullWidth={true}
          />
          <br />
          <br />
          <RaisedButton
            label="Sign In"
            fullWidth={true}
            backgroundColor="#364459"
            labelColor="white"
            onClick={this.handleOnClick}
          />
          <br />
          <Link to="/signup">
            <FlatButton
              label="Register"
              fullWidth={true}
            />
          </Link>
        </Paper>
      </div>
    );
  }
}
