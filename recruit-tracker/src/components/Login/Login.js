import React, { useState } from "react";
import "./Login.css"; // Make sure the CSS file is in the same folder
import logo from "../../images/cgi_logo.png";
import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  // State variables to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Make fetch request to your backend
    try {
      const response = await fetch("/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If login successful, navigate to student page or perform other actions
        console.log("Login successful!");
        console.log("repsponse: ", response);
        // Redirect or perform other actions here
      } else {
        // Handle login failure
        console.log("Login failed!");
        // Handle login failure scenario, display error message, etc.
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error scenario
    }
  };

  return (
    <div className="MITCH">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src={logo} alt="Company logo" width="106.68" height="50" />
          <div className="login-form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Use button for form submission */}
          <button type="submit" className="login-button">
            Log In
          </button>
          <Link
            to="/forgetpw"
            style={{
              display: "inline-block",
              marginTop: "8px",
              width: "130px",
            }}
          >
            Forgot password?
          </Link>
          <div className="signup">
            <hr style={{ margin: "0 auto 5px" }} />
            <p> &nbsp; or &nbsp;</p>
            <hr style={{ margin: "0 auto 5px" }} />
            <br />
            <br />
            <p>
              Don't have an account? <Link to="/loginform">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
