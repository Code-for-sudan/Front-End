import React from "react";
import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";



const PublicRoutes = () => {
    return (
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
}