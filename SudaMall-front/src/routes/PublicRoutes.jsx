import { Route, Routes } from "react-router-dom";
import Home from "../pages/public/Home";
import Auth from "../pages/public/auth/Auth";
import Login from "../pages/public/Login";
import SignupUser from "../pages/public/SignupUser";
import SignupBusiness from "../pages/public/Signup-business/SignupBusiness";
import NotFound from "../pages/public/NotFound";
import PublicLayout from "../layouts/PublicLayout";
import ResetPassword from "../pages/public/ResetPassword";

/**
 * PublicRoutes
 * ---------------
 * Defines all routes specific to public within the application.
 * 
 * Structure:
 * - Wraps all public pages inside the PublicLayout.
 * - Uses nested routing to render child routes via <Outlet /> in the PublicLayout.
 */
const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup-user" element={<SignupUser />} />
        <Route path="/auth/signup-business" element={<SignupBusiness />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
