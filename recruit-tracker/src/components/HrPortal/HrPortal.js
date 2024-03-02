import React from "react";
import Header from "../Header/Header"; // Adjust the import path as necessary.
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import students from "../../testData/testStudents"; // Adjust the import path based on your file structure.

const HrPortal = () => {
  const handleUpdate = (email) => {
    console.log("Update requested for:", email);
    // Implement the update logic or set state here
  };

  // Inline style for table cell borders and table layout
  const cellStyle = {
    borderRight: "1px solid rgba(224, 224, 224, 1)", // Adds a border to the right of each cell
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <h2>HR Dashboard</h2>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}
        >
          {" "}
          {/* Adds a subtle shadow to the table container for depth */}
          <Table aria-label="student data table" style={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {/* Table headers */}
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "State",
                  "School",
                  "Graduation",
                  "Position",
                  "Office Location",
                  "Stage",
                  "Interest",
                  "LinkedIn",
                  "Actions",
                ].map((header) => (
                  <TableCell
                    key={header}
                    style={{
                      ...cellStyle,
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                    }}
                  >
                    {header}
                  </TableCell> // Adds custom styling to headers
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  {" "}
                  {/* Adds hover effect to rows */}
                  <TableCell style={cellStyle}>{student.name}</TableCell>
                  <TableCell style={cellStyle}>{student.email}</TableCell>
                  <TableCell style={cellStyle}>{student.phone}</TableCell>
                  <TableCell style={cellStyle}>{student.state}</TableCell>
                  <TableCell style={cellStyle}>{student.school}</TableCell>
                  <TableCell style={cellStyle}>{student.graduation}</TableCell>
                  <TableCell style={cellStyle}>{student.position}</TableCell>
                  <TableCell style={cellStyle}>
                    {student.officeLocation}
                  </TableCell>
                  <TableCell style={cellStyle}>{student.stage}</TableCell>
                  <TableCell style={cellStyle}>{student.interest}</TableCell>
                  <TableCell style={cellStyle}>
                    <a
                      href={student.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(student.email)}
                      style={{ marginLeft: "auto", marginRight: 0 }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HrPortal;
