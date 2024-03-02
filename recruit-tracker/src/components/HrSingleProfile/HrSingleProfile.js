import React from "react";
import HrHeader from "../HrHeader/HrHeader";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArticleIcon from "@mui/icons-material/Article"; // Assuming ArticleIcon for resume
import students from "../../testData/testStudents"; // Adjust the import path as necessary

const HrSingleProfile = () => {
  const [profileInfo, setProfileInfo] = React.useState(students[0]); // Assuming first student for demo
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [currentField, setCurrentField] = React.useState("");
  const [fieldValue, setFieldValue] = React.useState("");

  const handleEditClick = (field, value) => {
    setCurrentField(field);
    setFieldValue(value);
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveField = () => {
    setProfileInfo({ ...profileInfo, [currentField]: fieldValue });
    setEditDialogOpen(false);
  };

  const handleFieldChange = (e) => {
    setFieldValue(e.target.value);
  };

  const handleSaveChanges = () => {
    console.log("Saving changes", profileInfo);
    // Implement the fetch request here
  };

  return (
    <div>
      <HrHeader />
      <div className="main-content">
        <h2>Profile Information</h2>
        <Grid container spacing={2}>
          {Object.entries(profileInfo).map(
            ([key, value]) =>
              key !== "id" && (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {key === "linkedIn" && (
                    <Link
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton color="primary">
                        <LinkedInIcon />
                      </IconButton>
                    </Link>
                  )}
                  {key === "resume" && (
                    <Link
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton color="primary">
                        <ArticleIcon />
                      </IconButton>
                    </Link>
                  )}
                </Grid>
              )
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            Save Changes
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default HrSingleProfile;
