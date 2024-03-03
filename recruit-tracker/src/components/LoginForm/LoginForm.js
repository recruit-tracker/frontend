import React, { useState } from "react";
import "./LoginForm.css"; // Ensure there's a corresponding CSS file for styling
import logo from "../../images/cgi_logo.png";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    preference: "", // Internship or Full-time
    state: "", // Using state abbreviation
    college: "",
    gradDate: "",
    linkedIn: "",
    formData: { "": "" },
    resume: "placeholder", // Added for resume file
  });

  // Array of U.S. state abbreviations
  const stateAbbreviations = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userForm = {
      name: formData.name,
      email: formData.email,
      password: formData.password,

      state: formData.state,
      college: formData.college,
      locationPreferences: formData.locationPreferences,
      gradDate: formData.gradDate,
      position: formData.preference,
      stage: "Applied",
      resume: null,
      feedback: { "": "" },
      linkedIn: formData.linkedIn,
      interest: "",
    };

    fetch(`${API_URL}/student`, {
      method: "POST",
      body: JSON.stringify({ user: userForm }),
    })
      .then((response) => {
        if (response.status === 200) {
          const form = new FormData();
          form.append("email", formData.email);
          form.append("resume", formData.resume);

          fetch(`${API_URL}/upload`, {
            method: "POST",
            body: form,
          });

          navigate("/");
        } else {
          throw new Error(
            "Failed to submit user form with status: " + response.status
          );
        }
      })

      .then((uploadResponse) => {
        if (uploadResponse) {
          return uploadResponse.json();
        }
      })
      .then((uploadData) => {
        if (uploadData) {
          console.log(uploadData);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="JAYDEN">
      <div className="JAY">
        <div className="signup-container">
          <img src={logo} alt="Company logo" width="106.68" height="50" />
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label>Employment</label>
              <select
                name="preference"
                value={formData.preference}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="internship">Internship</option>
                <option value="full-time">Full-Time</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                {stateAbbreviations.map((abbreviation) => (
                  <option key={abbreviation} value={abbreviation}>
                    {abbreviation}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="college">College</label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                placeholder="College"
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="gradDate">Graduation Date </label>
              <input
                type="text"
                id="gradDate"
                name="gradDate"
                value={formData.gradDate}
                placeholder="05/2026"
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="locationPreferences">Location Preferences</label>
              <input
                type="text"
                id="locationPreferences"
                name="locationPreferences"
                value={formData.locationPreferences}
                placeholder="Birmingham, Atlanta, Colorado..."
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="locationPreferences">LinkedIn</label>
              <input
                type="text"
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn}
                placeholder="LinkedIn"
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="resume">Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit">Sign Up</button>
            </div>
            <footer className="studentFooter">
            Recruiter © 2024
          </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
