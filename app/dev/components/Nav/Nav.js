import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import Menu from 'material-ui/Menu';
import FileFileDownload from "material-ui/svg-icons/file/file-download";
import ContentSave from "material-ui/svg-icons/content/save";
import AccountCircle from "material-ui/svg-icons/action/account-circle";
import { withRouter } from "react-router-dom";

import "./Nav.css"

const Nav = ({
  saveFile,
  markdownFile,
  htmlFile,
  saveDocument,
  lastSave,
  history
}) => {
  const timeDiff = lastSave ? new Date(lastSave).toLocaleTimeString() : null;
  return (
    <nav className="nav">
      <a href="/" className="logo">
        Markdown Pad
      </a>
      <div>
        {timeDiff != null && <p style={{color:"white"}}>last saved {timeDiff}</p>}
        <IconButton onClick={saveDocument}>
          <ContentSave color="#ececec" />
        </IconButton>
        <IconMenu
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          iconButtonElement={
            <IconButton>
              <FileFileDownload color="#ececec" />
            </IconButton>
          }
        >
          <MenuItem
            primaryText="Download Markdown"
            onClick={() => saveFile(markdownFile)}
          />
          <MenuItem primaryText="Download HTML" onClick={() => saveFile(htmlFile)} />
        </IconMenu>

        <IconButton>
          <AccountCircle color="#ececec"
            onClick={() => history.push("/login")}
          />
        </IconButton>
      </div>
    </nav>
  );
};

export default withRouter(Nav);
