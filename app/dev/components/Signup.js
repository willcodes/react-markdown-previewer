import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
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

export default class Signup extends React.Component {
  render() {
    return (
      <div className="container">
        <Paper 
          zDepth={2}
          className="registration-container"
        >
          <h2>Markdown Pad Registration</h2>
          <TextField
            floatingLabelText="First Name"
            errorText="Please enter your First Name"
            underlineFocusStyle={{borderColor: "#364459"}}
            floatingLabelFocusStyle={{color: "#7589a3"}}
            fullWidth={true}
            />
          <TextField
            floatingLabelText="Last Name"
            errorText="Please enter your Last Name"
            underlineFocusStyle={{borderColor: "#364459"}}
            floatingLabelFocusStyle={{color: "#7589a3"}}
            fullWidth={true}
            />
          <TextField
            floatingLabelText="Email"
            errorText="Please enter your Email"
            underlineFocusStyle={{borderColor: "#364459"}}
            floatingLabelFocusStyle={{color: "#7589a3"}}
            fullWidth={true}
            />
          <TextField
            floatingLabelText="Username"
            errorText="Please enter your username"
            underlineFocusStyle={{borderColor: "#364459"}}
            floatingLabelFocusStyle={{color: "#7589a3"}}
            fullWidth={true}
            />
          <TextField
            floatingLabelText="Password"
            type="password"
            underlineFocusStyle={{borderColor: "#364459"}}
            floatingLabelFocusStyle={{color: "#7589a3"}}
            fullWidth={true}
          />
          <br />
          <br />
          <Link to="/signup">
            <RaisedButton 
              label="Register" 
              fullWidth={true}  
              backgroundColor="#364459"
              labelColor="white"          
            />
          </Link>
          </Paper>
      </div>
    );
  }
}
