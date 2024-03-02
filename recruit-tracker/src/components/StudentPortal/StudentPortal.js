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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArticleIcon from "@mui/icons-material/Article";
import { students } from "../../testData/testStudents"; // Adjust the import path as necessary

console.log("students", students);
const HrSingleProfile = () => {
  const [profileInfo, setProfileInfo] = useState(students[0]); // Assuming first student for demo
  const [editField, setEditField] = useState(null);

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleFieldChange = (e, field) => {
    setProfileInfo({ ...profileInfo, [field]: e.target.value });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes", profileInfo);
    setEditField(null); // Clear the edit field state to exit editing mode
  };

  return (
    <div>
      <HrHeader />
      <div className="main-content">
        <h2>Profile Information</h2>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {/* Render only specific fields in the top section */}
          {Object.entries(profileInfo).map(
            ([key, value]) =>
              key !== "id" &&
              key !== "feedback" && (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={editField === key ? value : value || ""}
                    onChange={(e) => handleFieldChange(e, key)}
                    variant="outlined"
                    InputProps={{
                      readOnly: editField !== key,
                    }}
                  />
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(key)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )
          )}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          style={{ marginBottom: "20px" }}
        >
          Save Changes
        </Button>
        {/* Feedback Section */}
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          Feedback
        </Typography>
        <List dense={true}>
          {Object.entries(profileInfo.feedback || {}).map(
            ([reviewer, feedback], index) => (
              <ListItem key={index} divider>
                <ListItemText primary={feedback} secondary={`- ${reviewer}`} />
              </ListItem>
            )
          )}
        </List>
      </div>
    </div>
  );
};

export default HrSingleProfile;
