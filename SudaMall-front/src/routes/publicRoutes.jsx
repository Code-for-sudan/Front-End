import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import NotFound from "../pages/public/NotFound"



const PublicRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
}

export default PublicRoutes;