import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  if (allowedRoles.includes("hr") && userRole == "student") {
    return <Navigate to="/student" replace></Navigate>;
  } else if (allowedRoles.includes("student") && userRole == "hr") {
    return <Navigate to="/hr" replace></Navigate>;
  }
};

export default ProtectedRoute;
