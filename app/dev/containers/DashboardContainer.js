import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import config from "../config";

import Dashboard from "../components/Dashboard/Dashboard"

class DashboardContainer extends React.Component {

    state = {
        documents: []
    }

    fetchDocuments = () => {
        const token = localStorage.getItem('token');
        axios.get(`${config.base_url}/api/documents/user`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.status != 200) {
                    this.props.logout();
                } else if (res.status == 200 && res.data != null) {
                    this.setState({ documents: res.data });
                }
            })
    }

    componentDidMount = () => {
        this.fetchDocuments();
    }

    render() {
        return (
            <Dashboard documents={this.state.documents} />
        );
    }
}

export default DashboardContainer;