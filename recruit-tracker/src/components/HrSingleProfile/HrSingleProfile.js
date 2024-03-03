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
import { students } from "../../testData/testStudents"; // Adjust the import path as necessary

const HrSingleProfile = () => {
  const location = useLocation();
  const { student } = location.state || {};
  console.log("student", student);
  console.log("previous", students[0]);
  const [profileInfo, setProfileInfo] = useState({
    ...student,
    feedback: Array.isArray(student.feedback)
      ? student.feedback
      : Object.entries(student.feedback || {}).map(([reviewer, text]) => ({
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
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {Object.entries(profileInfo).map(([key, value]) => {
            const isSelectField = key === "stage" || key === "position";
            return (
              key !== "id" &&
              key !== "feedback" && (
                <Grid item xs={12} sm={6} key={key}>
                  <FormControl fullWidth variant="outlined">
                    {isSelectField ? (
                      <>
                        <InputLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </InputLabel>
                        <Select
                          value={value}
                          onChange={(e) => handleFieldChange(e, key)}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {key === "stage" ? (
                            <>
                              <MenuItem value="Applying">Applying</MenuItem>
                              <MenuItem value="Reviewed">Reviewed</MenuItem>
                              <MenuItem value="Interviewed">
                                Interviewed
                              </MenuItem>
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
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title="Edit">
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </FormControl>
                </Grid>
              )
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
