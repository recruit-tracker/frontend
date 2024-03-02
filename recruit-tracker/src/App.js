import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import StudentPortal from "./components/StudentPortal/StudentPortal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<StudentPortal></StudentPortal>}></Route>
    </Routes>
  );
};

export default AppRoutes;
