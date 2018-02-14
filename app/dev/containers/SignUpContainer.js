import React from "react";
import Signup from "../components/Signup/Signup";
import { Redirect, withRouter } from "react-router-dom"
import config from "../config";
import axios from "axios";

import * as userActions from "../store/user/actions";

class SignUpContainer extends React.Component {
    componentDidMount() {
        if (localStorage.getItem("token")) this.props.history.push("/user/dashboard")
    }

    handleCreateUser = async (data) => {
        var onSuccess = (res) => {
            if (res.status === 200 && res.data.success) {
                this.props.history.push("/login");
                return({success:true})
            }
            else {
                return onError(error)
            }
        }

        var onError = (error) => {
            return ({ error, success:false })
        }

        try {
            const success = await axios.post(`${config.base_url}/api/users`, data);
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
    render() {
        return (
            <Signup handleCreateUser={this.handleCreateUser} />
        );
    }
}

export default (SignUpContainer)
