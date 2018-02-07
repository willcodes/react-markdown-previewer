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

import * as userActions from "../store/user/actions";

class UserRouter extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const { userValidated } = this.props.user;
        return (
            <div>
                {!userValidated ? <Redirect to="/login" /> : (
                    <div>
                        <Route exact path="/user" render={() => <div>profile page</div>} />
                        <Route path="/user/dashboard" render={() => <div>dashboard page</div>} />
                    </div>)}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: getUser(state)
})

export default connect(mapStateToProps)(UserRouter);

