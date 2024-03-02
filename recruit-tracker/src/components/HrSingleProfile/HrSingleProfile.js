import React, { useState } from "react";
import HrHeader from "../HrHeader/HrHeader";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Link,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArticleIcon from "@mui/icons-material/Article";
import { students } from "../../testData/testStudents"; // Adjust the import path as necessary

const HrSingleProfile = () => {
  const [profileInfo, setProfileInfo] = useState(students[0]);
  const [editField, setEditField] = useState(null);
  const [editableFeedback, setEditableFeedback] = useState(null);

  const handleEditClick = (field) => {
    setEditField(field);
    setEditableFeedback(null); // Reset editable feedback to ensure only one edit mode is active
  };

  const handleFeedbackEditClick = (reviewer) => {
    setEditableFeedback(reviewer);
    setEditField(null); // Reset edit field to ensure only one edit mode is active
  };

  const handleFieldChange = (e, field) => {
    if (editableFeedback) {
      // Update feedback text
      setProfileInfo({
        ...profileInfo,
        feedback: {
          ...profileInfo.feedback,
          [editableFeedback]: e.target.value,
        },
      });
    } else {
      // Update other profile fields
      setProfileInfo({ ...profileInfo, [field]: e.target.value });
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving changes", profileInfo);
    setEditField(null);
    setEditableFeedback(null);
  };

  return (
    <div>
      <HrHeader />
      <div
        className="main-content"
        style={{ padding: "24px", marginTop: "64px" }}
      >
        <Typography variant="h4" gutterBottom>
          Profile Information
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {/* Render only specific fields in the top section */}
          {Object.entries(profileInfo).map(
            ([key, value]) =>
              key !== "id" &&
              key !== "feedback" && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={key}
                  style={{ position: "relative" }}
                >
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={editField === key ? value : value || ""}
                    onChange={(e) => handleFieldChange(e, key)}
                    variant="outlined"
                    InputProps={{
                      readOnly: editField !== key,
                      endAdornment: (
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEditClick(key)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
              )
          )}
        </Grid>
        <Typography variant="h5" gutterBottom>
          Feedback
        </Typography>
        <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reviewer</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(profileInfo.feedback || {}).map(
                ([reviewer, feedback], index) => (
                  <TableRow key={index}>
                    <TableCell>{reviewer}</TableCell>
                    <TableCell>
                      {editableFeedback === reviewer ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          value={feedback}
                          onChange={(e) => handleFieldChange(e, reviewer)}
                        />
                      ) : (
                        feedback
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleFeedbackEditClick(reviewer)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              )}
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
