import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import LoginForm from "./components/LoginForm/LoginForm";
import StudentPortal from "./components/StudentPortal/StudentPortal";
import HrPortal from "./components/HrPortal/HrPortal";
import HrSingleProfile from "./components/HrSingleProfile/HrSingleProfile";
import ForgetPw from "./components/forgetpw/ForgetPw";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const navigate = useNavigate();

  let role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) {
      navigate("/");
    } else if (role == "student") {
      navigate("/student");
    } else if (role == "hr") {
      navigate("/hr");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentPortal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <HrPortal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/student"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <HrSingleProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/forgetpw" element={<ForgetPw />} />
    </Routes>
  );
};

export default AppRoutes;
