import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import config from "../../config";

class Dashboard extends React.Component {
  addDocument = async () => {
    try {
      const res = await fetch(
        config.base_url + config.document_route + "/add  ",
        {
          headers: config.headers,
          method: "POST"
        }
      );
      const data = await res.json();
      this.props.history.push(`/user/pad`, { id: data.data[0] });
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteDocument = async id => {
    try {
      const res = await fetch(
        config.base_url + config.document_route + "/delete",
        {
          headers: config.headers,
          method: "POST",
          body: JSON.stringify({
            document_id: id
          })
        }
      );
      const data = await res.json();
      this.props.fetchDocuments();
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { documents = [] } = this.props;
    return (
      <div>
        <button onClick={this.addDocument}>add document</button>
        <ul>
          {documents.map(item => (
            <li key={item.id}>
              <Link to={{ pathname: `/user/pad`, state: { id: item.id } }}>
                <h2>{item.title}</h2>
                <p>{item.content.substring(0, 20) + "...."}</p>
              </Link>
              <button onClick={() => this.deleteDocument(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(Dashboard);
