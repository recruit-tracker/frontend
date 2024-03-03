import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./StudentPortal.css";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API_URL } from "../../constants";

const StudentPortal = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    state: "",
    college: "",
    locationPreferences: "",
    resume: "",
  });

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setStudentInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    console.log("Saving changes", studentInfo);
    // Here you would typically send the updated studentInfo to your backend
    // This example shows a generic fetch request; adjust it as needed for your API
    try {
      const response = await fetch(`${API_URL}/student/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: studentInfo,
        }),
      });
      if (response.ok) {
        console.log("Changes saved successfully");
        setIsSaveDialogOpen(true);
      } else {
        console.log("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading:", file.name);
      setStudentInfo((prevState) => ({
        ...prevState,
        resume: file.name,
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
      college: user["college"],
      locationPreferences: user["locationPreferences"], // Assuming you meant the location preference here
      resume: "Not Uploaded", // Placeholder text
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
                      accept="application/pdf"
                    />
                  </Button>
                ) : (
                  <TextField
                    fullWidth
                    variant="standard"
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  />
                )}
              </span>
              <IconButton aria-label="edit" size="large" disabled>
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
        <Dialog
          open={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Changes Saved"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your changes have been saved successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSaveDialogOpen(false)} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <footer className="studentFooter">
        Recruiter © 2024
      </footer>
    </div>
  );
};

export default StudentPortal;
