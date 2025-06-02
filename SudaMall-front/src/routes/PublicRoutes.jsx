import { Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import NotFound from "../pages/public/NotFound";
import PublicLayout from "../layouts/PublicLayout";

/**
 * PublicRoutes
 * ---------------
 * Defines all routes specific to public within the application.
 * 
 * Structure:
 * - Wraps all public pages inside the PublicLayout.
 * - Uses nested routing to render child routes via <Outlet /> in the PublicLayout.
 *
 */
const PublicRoutes = () => [
  <Route key="public" element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<NotFound />} />
  </Route>
];

export default PublicRoutes;
