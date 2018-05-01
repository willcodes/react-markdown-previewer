import React from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    const { documents = [] } = this.props;
    console.log(documents);
    return (
      <div>
        {documents.map(item => (
          <Link
            to={{ pathname: `/user/pad`, state: { id: item.id } }}
            key={item.id}
          >
            <h2>{item.title}</h2>
            <h2>{item.content.substring(0, 20) + "...."}</h2>
          </Link>
        ))}
      </div>
    );
  }
}

export default Dashboard;
