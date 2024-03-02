// Login.js
import React from 'react';
import './Login.css'; // Make sure the CSS file is in the same folder

const Login = () => {
  return (
    <div className="login-container">
        <form className="login-form">
            <h2>Login</h2>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Log In</button>
        </form>
    </div>
  );
};

export default Login;
