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
import { connect } from 'react-redux'
import { getUser } from "../store/reducer";
import  axios from "axios"
import config from "../config"

import * as userActions from "../store/user/actions";

class UserRouter extends React.Component {

    validateUser = async () => {
        const { dispatch } = this.props;
        var onSuccess = (res) => {
            if (res.status === 200 && res.data.success) {
                dispatch(userActions.setUserValidation(true))
                console.log('hit')
            }
            else {
                dispatch(userActions.setUserValidation(false))
                console.log('hello', res)
            }
        }

        var onError = (error) => {
            dispatch(userActions.setUserValidation(false))
            localStorage.removeItem("token");
            this.props.history.push("/login");
            console.log('fail', error)
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("no token");
            console.log(token)
            const success = await axios.get(`${config.base_url}/api/validate`, { headers: { Authorization:`Bearer ${token}` } });
            onSuccess(success);
        } catch (error) {
            onError(error);
        }
    }

    componentWillMount() {
        this.validateUser();
    }

    render() {
        const { userValidated } = this.props.user;
        return userValidated ? (
            <div>
                <Route exact path="/user" render={() => <div>profile page</div>} />
                <Route path="/user/dashboard" render={() => <div>dashboard page</div>} />
            </div>
        ) : <div>loading</div>;
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: getUser(state)
})

export default connect(mapStateToProps)(UserRouter);

