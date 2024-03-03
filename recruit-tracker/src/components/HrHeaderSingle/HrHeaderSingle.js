// Header.js
import React from "react";
import "./HrHeaderSingle.css"; // Make sure the CSS file is in the same folder

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        HR Portal
        {/* You can replace the text with an actual image logo if you have one */}
        {/* <img src="path/to/your/logo.png" alt="Logo" /> */}
      </div>
      <div className="logout" style={{ fontWeight: "bold" }}>
        Home
        {/* This can be made interactive with an onClick event handler for actual logout functionality */}
      </div>
    </div>
  );
};

export default Header;
