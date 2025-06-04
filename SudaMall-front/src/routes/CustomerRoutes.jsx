import { Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import CustomerDashboard from "../pages/customer/CustomerDashboard";

/**
 * CustomerRoutes
 * ---------------
 * Defines all routes specific to customers within the application.
 * 
 * Structure:
 * - Wraps all customer-related pages inside the CustomerLayout.
 * - Uses nested routing to render child routes via <Outlet /> in the CustomerLayout.
 *
 */

const CustomerRoutes = () => [
  <Route key="customer" element={<CustomerLayout />}>
    <Route path="/dashboard" element={<CustomerDashboard />} />
  </Route>
];

export default CustomerRoutes;
