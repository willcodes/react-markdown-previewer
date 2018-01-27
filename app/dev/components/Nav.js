import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import FileFileDownload from "material-ui/svg-icons/file/file-download";
import ContentSave from "material-ui/svg-icons/content/save";

const Nav = ({ saveFile, markdownFile, htmlFile, saveDocument }) => {
  return (
    <nav className="nav">
      <a href="/" className="logo">
        Markdown Pad
      </a>
      <ul>
        <IconButton onClick={saveDocument}>
          <ContentSave color="black" />
        </IconButton>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <FileFileDownload color="black" />
            </IconButton>
          }
        >
          <MenuItem
            primaryText="As Markdown"
            onClick={() => saveFile(markdownFile)}
          />
          <MenuItem primaryText="As HTML" onClick={() => saveFile(htmlFile)} />
        </IconMenu>
      </ul>
    </nav>
  );
};

export default Nav;
