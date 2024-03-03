import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HrHeaderSingle from "../HrHeaderSingle/HrHeaderSingle";
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
  const { _id, ...studentWithoutId } = originalStudent || {};

  const [profileInfo, setProfileInfo] = useState({
    ...studentWithoutId,
    feedback: Array.isArray(studentWithoutId.feedback)
      ? studentWithoutId.feedback
      : Object.entries(studentWithoutId.feedback || {}).map(([reviewer, text]) => ({
          reviewer,
          text,
        })),
  });

  const handleFieldChange = (e, field) => {
    setProfileInfo({ ...profileInfo, [field]: e.target.value });
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
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HrHeaderSingle />
      <div className="main-content" style={{ flexGrow: 1, overflowY: "auto", padding: "24px", marginTop: "43px" }}>
        <Typography variant="h4" gutterBottom>Profile Information</Typography>
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
                      <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                      <Select
                        value={value || ""}
                        onChange={(e) => handleFieldChange(e, key)}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                      >
                        {key === "stage" ? (
                          ["Applying", "Reviewed", "Interviewed", "Offered"].map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          ))
                        ) : (
                          ["Full Time", "Part Time", "Intern"].map(option => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          ))
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
                        startAdornment: key === "linkedin" ? (
                          <InputAdornment position="start">
                            <IconButton onClick={() => window.open(value, "_blank")}>
                              <LinkedInIcon />
                            </IconButton>
                          </InputAdornment>
                        ) : key === "resume" ? (
                          <InputAdornment position="start">
                            <IconButton onClick={() => window.open(value, "_blank")}>
                              <DescriptionIcon />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                        endAdornment: key !== "email" && key !== "name" ? (
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
        </Typography>
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reviewer</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profileInfo.feedback.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={feedback.reviewer}
                      onChange={(e) =>
                        handleFeedbackChange(e, index, "reviewer")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={feedback.text}
                      onChange={(e) => handleFeedbackChange(e, index, "text")}
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
