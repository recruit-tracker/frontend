import React, { useState } from "react";
import "./Login.css"; // Make sure the CSS file is in the same folder
import logo from "../../images/cgi_logo.png";
import { Link } from "react-router-dom"; // Import Link for navigation
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State variables to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function decodeJWT(token) {
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert base64-url to base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload); // Parse the payload to an object
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const form = { user: { email: username, password: password } };

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Login successful!");
        console.log("repsponse: ", response);
        let json = await response.json();
        let token = decodeJWT(json["token"]);
        console.log(token);
        localStorage.setItem("role", token["role"]);
        localStorage.setItem("email", token["email"]);
        navigate("/student");
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
