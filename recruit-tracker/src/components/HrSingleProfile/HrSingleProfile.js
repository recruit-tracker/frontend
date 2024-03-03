import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HrHeaderSingle from "../HrHeaderSingle/HrHeaderSingle";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import { API_URL } from "../../constants";

const HrSingleProfile = () => {
  const location = useLocation();
  const { student: originalStudent } = location.state || {};
  const { _id, resume_hash, role, aiFeedback, ...studentWithoutId } =
    originalStudent || {};
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({
    ...studentWithoutId,
    feedback: Array.isArray(studentWithoutId.feedback)
      ? studentWithoutId.feedback
      : Object.entries(studentWithoutId.feedback || {}).map(
          ([reviewer, text]) => ({
            reviewer,
            text,
          })
        ),
  });

  const handleFieldChange = (e, field) => {
    setProfileInfo({ ...profileInfo, [field]: e.target.value });
  };

  const handleDeleteUser = () => {
    console.log("Deleting user with email:", profileInfo.email);

    fetch(`${API_URL}/student/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email: profileInfo.email },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        // Keep a copy of all students for filtering
      })
      .then((data) => navigate("/hr"))
      .catch((error) => {
        console.error("Error fetching students:", error);

      });
  };

  const handleFeedbackChange = (e, index, field) => {
    const updatedFeedback = profileInfo.feedback.map((feedback, i) => {
      if (i === index) {
        return { ...feedback, [field]: e.target.value };
      }
      return feedback;
    });
    setProfileInfo({ ...profileInfo, feedback: updatedFeedback });
  };

  const handleAddFeedback = () => {
    const newFeedback = { reviewer: "", text: "" };
    setProfileInfo((prevState) => ({
      ...prevState,
      feedback: [...prevState.feedback, newFeedback],
    }));
  };

  const handleAddAIFeedback = () => {
    const aiFeedback = {
      reviewer: "AI",
      text: "This is AI-generated feedback.",
    }; // Example AI-generated feedback

    // Log the user's email to the console
    console.log("User's email:", profileInfo.email);

    fetch(`${API_URL}/hr/suggestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: profileInfo.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data.text.content);
        const aiFeedback2 = {
          reviewer: "AI",
          text: data.text.content,
        };
        setProfileInfo((prevState) => ({
          ...prevState,
          feedback: [...prevState.feedback, aiFeedback2],
        }));
        // Keep a copy of all students for filtering
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes", profileInfo);
    fetch(API_URL + "/student/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: profileInfo,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate("/hr"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HrHeaderSingle />
      <div
        className="main-content"
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "24px",
          marginTop: "43px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile Information
          <IconButton
            onClick={handleDeleteUser}
            aria-label="delete user"
            style={{ marginLeft: "10px" }}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>

        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {Object.entries(profileInfo).map(([key, value]) => {
            if (key === "id" || key === "feedback") {
              return null; // Skip these fields
            }

            return (
              <Grid item xs={12} sm={6} key={key}>
                <FormControl fullWidth variant="outlined">
                  {key === "stage" || key === "position" ? (
                    <>
                      <InputLabel>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </InputLabel>
                      <Select
                        value={value || ""}
                        onChange={(e) => handleFieldChange(e, key)}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                      >
                        {key === "stage"
                          ? [
                              "Applying",
                              "Reviewed",
                              "Interviewed",
                              "Offered",
                            ].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))
                          : ["Full Time", "Part Time", "Intern"].map(
                              (option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              )
                            )}
                      </Select>
                    </>
                  ) : (
                    <TextField
                      fullWidth
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      onChange={(e) => handleFieldChange(e, key)}
                      variant="outlined"
                      InputProps={{
                        startAdornment:
                          key === "linkedin" ? (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={() => window.open(value, "_blank")}
                              >
                                <LinkedInIcon />
                              </IconButton>
                            </InputAdornment>
                          ) : key === "resume" ? (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={() => window.open(value, "_blank")}
                              >
                                <DescriptionIcon />
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                        endAdornment:
                          key !== "email" && key !== "name" ? (
                            <InputAdornment position="end">
                              <Tooltip title="Edit">
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ) : null,
                      }}
                    />
                  )}
                </FormControl>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h5" gutterBottom>
          Feedback
          <IconButton onClick={handleAddFeedback} aria-label="add feedback">
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={handleAddAIFeedback}
            aria-label="add AI feedback"
          >
            <AutoAwesome /> {/* Using AutoAwesome icon for AI feedback */}
          </IconButton>
        </Typography>
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>Reviewer</TableCell>{" "}
                {/* Adjusted width */}
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profileInfo.feedback.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: "20%", verticalAlign: "top" }}>
                    {" "}
                    {/* Align the TableCell content to the top */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={feedback.reviewer}
                      onChange={(e) =>
                        handleFeedbackChange(e, index, "reviewer")
                      }
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ style: { alignItems: "flex-start" } }} // Align the text field input to the top, might not be necessary but included for completeness
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      multiline
                      value={feedback.text}
                      onChange={(e) => handleFeedbackChange(e, index, "text")}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default HrSingleProfile;
