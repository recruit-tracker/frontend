import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import LoginForm from "./components/LoginForm/LoginForm";
import StudentPortal from "./components/StudentPortal/StudentPortal";
import HrPortal from "./components/HrPortal/HrPortal";
import HrSingleProfile from "./components/HrSingleProfile/HrSingleProfile";
import ForgetPw from "./components/forgetpw/ForgetPw";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/student" element={<StudentPortal />} />
      <Route path="/hr" element={<HrPortal />} />
      <Route path="/forgetpw" element={<ForgetPw />} />
      <Route path="/hr/student" element={<HrSingleProfile />} />
    </Routes>
  );
};

export default AppRoutes;
