import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import FileFileDownload from "material-ui/svg-icons/file/file-download";
import ContentSave from "material-ui/svg-icons/content/save";
import AccountCircle from "material-ui/svg-icons/action/account-circle";
import { withRouter } from "react-router-dom";

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
        {timeDiff != null && <p>last saved {timeDiff}</p>}
        <IconButton onClick={saveDocument}>
          <ContentSave color="#ececec" />
        </IconButton>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <FileFileDownload color="#ececec" />
            </IconButton>
          }
        >
          <MenuItem
            primaryText="As Markdown"
            onClick={() => saveFile(markdownFile)}
          />
          <MenuItem primaryText="As HTML" onClick={() => saveFile(htmlFile)} />
        </IconMenu>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <AccountCircle color="black" />
            </IconButton>
          }
        >
          <MenuItem
            primaryText="Login"
            onClick={() => history.push("/login")}
          />
          <MenuItem primaryText="Profile" />
          <MenuItem primaryText="Logout" />
        </IconMenu>
      </div>
    </nav>
  );
};

export default withRouter(Nav);
