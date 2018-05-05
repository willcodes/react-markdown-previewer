import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import config from "../config";
import * as actions from "../store/documents/actions";
import { getDocuments } from "../store/reducer";
import Dashboard from "../components/Dashboard/Dashboard";

class DashboardContainer extends React.Component {
  componentWillMount() {
    this.props.fetchDocuments();
  }

  render() {
    return (
      <Dashboard
        fetchDocuments={this.props.fetchDocuments}
        documents={this.props.documents}
      />
    );
  }
}

const mapStateToProps = (state, ownprops) => ({
  documents: getDocuments(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchDocuments: () => dispatch(actions.fetchDocuments())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
