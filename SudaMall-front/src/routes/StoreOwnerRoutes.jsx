import { Route } from "react-router-dom";
import { StoreOwnerLayout } from "../layouts";
import { AddProduct, Chats, Profile, Store, StoreOwnerDashboard } from "../pages/store-owner";


/**
 * Store Owner Routes
 * ---------------
 * Defines all routes specific to store owner within the application.
 * 
 * Structure:
 * - Wraps all store-owner related pages inside the StoreOwnerLayout.
 * - Uses nested routing to render child routes via <Outlet /> in the StoreOwnerLayout.
 *
 */

const StoreOwnerRoutes = () => [
  <Route key="store-owner" element={<StoreOwnerLayout />}>
    <Route path="/store-owner/:userId/dashboard" element={<StoreOwnerDashboard />} ></Route>
    <Route path="/store-owner/:userId/store" element={<Store />} ></Route>
    <Route path="/store-owner/:userId/chats" element={<Chats />} ></Route>
    <Route path="/store-owner/:userId/add-product" element={<AddProduct />} ></Route>
    <Route path="/store-owner/:userId/profile" element={<Profile />} ></Route>
  </Route>
];

export default StoreOwnerRoutes;
