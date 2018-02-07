import React from "react";
import Login from "../components/Login";
import { connect } from "react-redux"
import { getUser } from "../store/reducer";
import { USER_LOGIN_SUCCESS, USER_LOGIN_PENDING, USER_LOGIN_FAILED } from "../constants"
import { Redirect, withRouter } from "react-router-dom"
import config from "../config";
import axios from "axios";

import * as userActions from "../store/user/actions";

class LoginContainer extends React.Component {

  handleLogin = async (data) => {
    const { dispatch } = this.props;

    dispatch(userActions.setLoginStatus(USER_LOGIN_PENDING))
    var onSuccess = (res) => {
      if (res.status === 200 && res.data.success) {
        dispatch(userActions.setLoginStatus(USER_LOGIN_SUCCESS))
        dispatch(userActions.setUserValidation(true))
        localStorage.setItem("token",res.data.token);
        console.log('success', res)
      }
      else {
        dispatch(userActions.setUserValidation(false))
        dispatch(userActions.setLoginStatus(USER_LOGIN_FAILED))
        console.log('fail', res)
      }
    }

    var onError = (error) => {
      dispatch(userActions.setUserValidation(false))
      dispatch(userActions.setLoginStatus(USER_LOGIN_FAILED))
      console.log('fail')
    }

    try {
      const success = await axios.post(`${config.base_url}/api/login`, data);
      onSuccess(success);
    } catch (error) {
      onError(error);
    }
  }

  render() {
    const { loginStatus, userValidated } = this.props.user;
    const { history } = this.props
    if (loginStatus === USER_LOGIN_SUCCESS || userValidated) return <Redirect to="/user/dashboard" />;
    else return <Login handleLogin={this.handleLogin} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: getUser(state)
})

export default withRouter(connect(mapStateToProps)(LoginContainer));
