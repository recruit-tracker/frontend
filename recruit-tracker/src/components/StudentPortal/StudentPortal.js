import React, { useEffect, useState } from "react";
import Header from "../Header/Header"; // Adjust this import path as necessary.
import "./StudentPortal.css"; // Ensure this CSS file exists and is correctly referenced.
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button"; // Import Button component from Material-UI
import { API_URL } from "../../constants";

const StudentPortal = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    state: "",
    school: "",
    locationPreference: "", // Added new field for location preference
    resume: "", // Added new field for resume (considering it as a status message)
  });

  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
    // Add your logic to handle the edit action here.
    // For the "Resume" field, this might involve opening a file upload dialog.
  };

  const handleSaveChanges = () => {
    console.log("Save changes");
    // Implement save functionality here.
    // Make sure to include logic for handling file uploads if necessary.
  };

  // Function to handle file uploads, consider this as a placeholder
  // and update it according to your actual file upload logic
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading:", file.name);
      // Update the resume field in studentInfo state with the file name or upload status
      setStudentInfo((prevState) => ({
        ...prevState,
        resume: file.name, // Assuming you want to display the file name as the status
      }));
    }
  };

  const fetchUserInfo = async () => {
    const userEmail = localStorage.getItem("email");
    const form = { content: "", filter: { email: userEmail } };

    const response = await fetch(`${API_URL}/student/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const json = await response.json();

    const user = json["users"][0];

    const userData = {
      name: user["name"],
      email: user["email"],
      state: user["state"],
      school: user["college"],
      position: user["position"], // Added new field for location preference
      resume: "Not Uploaded", // Added new field for resume (considering it as a status message)
    };
    setStudentInfo(userData);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <Header />
      <div className="main-content">
        <h2>Student Information</h2>
        <div className="student-info">
          {Object.entries(studentInfo).map(([key, value]) => (
            <div key={key} className="info-row">
              <span className="info-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>
              <span className="info-value">
                {key === "resume" ? (
                  <Button variant="outlined" component="label">
                    Upload Resume
                    <input
                      type="file"
                      hidden
                      onChange={handleFileUpload}
                      accept="application/pdf" // Accept only PDF files
                    />
                  </Button>
                ) : (
                  value
                )}
              </span>
              {key !== "resume" && ( // Exclude the edit button for the resume field
                <IconButton
                  onClick={() => handleEdit(key)}
                  aria-label="edit"
                  size="large"
                >
                  <EditIcon />
                </IconButton>
              )}
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          className="save-changes-btn"
        >
          Save Changes
        </Button>
      </div>
      <footer className="studentFooter">
        Recruiter © 2024
      </footer>
    </div>
  );
};

export default StudentPortal;
