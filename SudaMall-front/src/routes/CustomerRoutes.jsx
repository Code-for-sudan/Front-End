import { Route } from "react-router-dom";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import { CustomerLayout } from "../layouts";
import ProductDetails from "../pages/customer/ProductDetails";
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
    <Route path="/customer/:userId/dashboard" element={<CustomerDashboard />} />
    <Route path="/customer/Product/:id" element={<ProductDetails />} />
  </Route>
];

export default CustomerRoutes;
