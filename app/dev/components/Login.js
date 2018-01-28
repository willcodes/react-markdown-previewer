import React from "react";
import TextField from "material-ui/TextField";
import { orange500, blue500 } from "material-ui/styles/colors";

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
      </div>
    );
  }
}
