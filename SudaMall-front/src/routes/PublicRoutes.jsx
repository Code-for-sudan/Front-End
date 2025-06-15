import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import SignupUser from "../pages/public/SignupUser";
import NotFound from "../pages/public/NotFound";
import  SignupBusiness from "../pages/public/Signup Business/SignupBusiness";

const PublicRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/signup-business" element={< SignupBusiness />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}

export default PublicRoutes;
