import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
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
  }
};

export default class Signup extends React.Component {
  state = {
    email: "",
    emailIsValid: false,
    username: "",
    usernameIsValid: false,
    password: "",
    passwordIsValid: false
  };

  handleOnChange = e => {
    const target = e.target;
    const value = target.value;
    const key = target.name;

    this.setState(
      {
        [key]: value
      },
      this.checkFormErrors
    );
  };

  checkFormErrors = () => {
    const { email, password, username } = this.state;
    let passwordIsValid = false,
      emailIsValid = false,
      usernameIsValid = false;
    if (this.validateEmail(email)) emailIsValid = true;
    if (password.length > 6) passwordIsValid = true;
    if (username) usernameIsValid = true;

    this.setState(
      ...this.state,
      {
        passwordIsValid,
        usernameIsValid,
        emailIsValid
      },
      // console.log(this.state)
    );
  };

  //should get a better pattern, or implement validation differently
  validateEmail = email => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  render() {
    const {
      username,
      password,
      email,
      emailIsValid,
      passwordIsValid,
      usernameIsValid
    } = this.state;
    return (
      <div className="container">
        <Paper zDepth={2} className="registration-container">
          <h2>Create Account</h2>
          <TextField
            floatingLabelText="Email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleOnChange}
            errorText={!emailIsValid ? "Please enter your Email" : false}
            underlineFocusStyle={{ borderColor: "#364459" }}
            floatingLabelFocusStyle={{ color: "#7589a3" }}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Username"
            name="username"
            value={username}
            onChange={this.handleOnChange}
            errorText={!usernameIsValid ? "Please enter your username" : false}
            underlineFocusStyle={{ borderColor: "#364459" }}
            floatingLabelFocusStyle={{ color: "#7589a3" }}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleOnChange}
            errorText={
              !passwordIsValid ? "Please enter at least 6 characters" : false
            }
            underlineFocusStyle={{ borderColor: "#364459" }}
            floatingLabelFocusStyle={{ color: "#7589a3" }}
            fullWidth={true}
          />
          <br />
          <br />
          <RaisedButton
            label="Register"
            fullWidth={true}
            backgroundColor="#364459"
            labelColor="white"
            onSubmit={e => e.preventDefault()}
          />
        </Paper>
      </div>
    );
  }
}
