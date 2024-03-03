// Header.js
import React from "react";
import "./HrHeaderSingle.css"; // Make sure the CSS file is in the same folder
import { Link } from "react-router-dom"; // Import Link from React Router

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        HR Portal
        {/* You can replace the text with an actual image logo if you have one */}
        {/* <img src="path/to/your/logo.png" alt="Logo" /> */}
      </div>
      <div>
        <Link
          className="logout"
          style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}
          to="/hr"
        >
          Home
        </Link>
        {/* This can be made interactive with an onClick event handler for actual logout functionality */}
      </div>
    </div>
  );
};

export default Header;
