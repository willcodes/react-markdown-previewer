import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { orange500, blue500 } from "material-ui/styles/colors";
import { Link } from "react-router-dom";

const styles = {
  errorStyle: {
    color: "red"
  },
  underlineStyle: {
    borderColor: blue500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <br />
        <TextField
          hintText="Username"
          errorText="This field is required."
          errorStyle={styles.errorStyle}
        />
        <br />
        <TextField
          hintText="Password"
          underlineStyle={styles.underlineStyle}
          type="password"
        />
        <br />
        <RaisedButton label="Sign In" primary={true} />
        <Link to="/signup">
          <p> sign up </p>
        </Link>
      </div>
    );
  }
}
