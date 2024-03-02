import React from 'react';
import './Login.css'; // Make sure the CSS file is in the same folder
import logo from "../../images/cgi_logo.png";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"; 

const Login = () => {
  return (
    <div class="MITCH">
    <div className="login-container">
      <form className="login-form">
        <img src={logo} alt="Company logo" width="106.68" height="50" />
        <div className="login-form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="login-form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
        <a href="/forgetpw" style={{ display: 'inline-block', marginTop: '8px', width: "130px" }}>Forgot password?</a>
        <div className="signup">
          <hr style={{ margin: '0 auto 5px' }} />
          <p> &nbsp; or &nbsp;</p>
          <hr style={{ margin: '0 auto 5px' }} />
          <br></br>
          <br></br>
          <p>Don't have an account? <a href="/LoginForm">Sign up</a></p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
