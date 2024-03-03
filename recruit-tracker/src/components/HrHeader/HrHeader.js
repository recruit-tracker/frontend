// Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./HrHeader.css"; // Make sure the CSS file is in the same folder

const Header = () => {
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
  };

  return (
    <div className="header">
      <div className="logo">
        HR Portal
        {/* You can replace the text with an actual image logo if you have one */}
        {/* <img src="path/to/your/logo.png" alt="Logo" /> */}
      </div>
      <div className="logout">
        <Link to="/" onClick={handleLogout} className="logout-link">
          Logout
        </Link>{" "}
        {/* Link for the Logout button */}
        {/* This can be made interactive with an onClick event handler for actual logout functionality */}
      </div>
    </div>
  );
};

export default Header;
