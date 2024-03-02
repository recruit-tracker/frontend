import React, { useState } from "react";
import Header from "../Header/Header"; // Adjust this import path as necessary.
import "./StudentPortal.css"; // Ensure this CSS file exists and is correctly referenced.
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button"; // Import Button component from Material-UI

const StudentPortal = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "Mitchell Kimbell",
    email: "mfkimbell@gmail.com",
    position: "Intern",
    state: "AL",
    school: "University of Alabama at Birmingham",
  });

  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
    // Add your logic to handle the edit action here.
  };

  const handleSaveChanges = () => {
    console.log("Save changes");
    // Implement save functionality here
  };

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
              <span className="info-value">{value}</span>
              <IconButton
                onClick={() => handleEdit(key)}
                aria-label="edit"
                size="large"
              >
                <EditIcon />
              </IconButton>
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
    </div>
  );
};

export default StudentPortal;
