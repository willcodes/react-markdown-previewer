import React from "react";
import Login from "../components/Login";
import { connect } from "react-redux"
import { getUser } from "../store/reducer";
import { USER_LOGGED_IN } from "../constants"
import { Redirect, withRouter } from "react-router-dom"

class LoginContainer extends React.Component {

  componentDidMount = () => {
    console.log(this.props)
  }
  render() {
    const { loginStatus, userValidated } = this.props.user;
    const { history } = this.props
    if (loginStatus === USER_LOGGED_IN && userValidated) return <Redirect to="/user/dashboard" />;
    else return <Login />
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: getUser(state)
})

export default withRouter(connect(mapStateToProps)(LoginContainer));
