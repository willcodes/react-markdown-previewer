import React from "react";

const Nav = ({ saveFile, markdownFile, htmlFile, saveDocument }) => {
  return (
    <nav className="nav">
      <a href="/" className="logo">
        Markdown Pad
      </a>
      <span className="tagline">
        A quick solution to rapidly write and save markdown.
      </span>
      <ul className="saveButtons">
        <li>
          <a
            href="#"
            onClick={() => {
              saveFile(markdownFile);
            }}
          >
            save as markdown
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              saveFile(htmlFile);
            }}
          >
            save as html
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              saveDocument();
            }}
          >
            save online
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
