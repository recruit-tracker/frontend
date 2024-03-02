import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import LoginForm from "./components/LoginForm/LoginForm"
import StudentPortal from "./components/StudentPortal/StudentPortal";
import HrPortal from "./components/HrPortal/HrPortal";
import HrSingleProfile from "./components/HrSingleProfile/HrSingleProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loginform" element= {<LoginForm/>}/>
      <Route path="/student" element={<StudentPortal></StudentPortal>}></Route>
      <Route path="/hr" element={<HrPortal></HrPortal>}></Route>
      <Route path="/hr/student" element={<HrSingleProfile></HrSingleProfile>}></Route>
    </Routes>
  );
};

export default AppRoutes;
