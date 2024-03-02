import React, { useState } from "react";
import HrHeader from "../HrHeader/HrHeader";
import {
  Button,
  Grid,
  IconButton,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { students } from "../../testData/testStudents"; // Adjust the import path as necessary

const HrSingleProfile = () => {
  const [profileInfo, setProfileInfo] = useState({
    ...students[0],
    feedback: Array.isArray(students[0].feedback)
      ? students[0].feedback
      : Object.entries(students[0].feedback || {}).map(([reviewer, text]) => ({
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
    // Implement save functionality here
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HrHeader />
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
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {Object.entries(profileInfo).map(([key, value]) =>
            key !== "id" && key !== "feedback" ? (
              <Grid item xs={12} sm={6} key={key}>
                {key === "stage" || key === "position" ? (
                  <Select
                    fullWidth
                    displayEmpty
                    value={value}
                    onChange={(e) => handleFieldChange(e, key)}
                    variant="outlined"
                  >
                    {key === "stage" ? (
                      <>
                        <MenuItem value="Applying">Applying</MenuItem>
                        <MenuItem value="Reviewed">Reviewed</MenuItem>
                        <MenuItem value="Interviewed">Interviewed</MenuItem>
                        <MenuItem value="Offered">Offered</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem value="Full Time">Full Time</MenuItem>
                        <MenuItem value="Part Time">Part Time</MenuItem>
                        <MenuItem value="Intern">Intern</MenuItem>
                      </>
                    )}
                  </Select>
                ) : (
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={(e) => handleFieldChange(e, key)}
                    variant="outlined"
                  />
                )}
              </Grid>
            ) : null
          )}
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
