import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
