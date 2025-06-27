import { Route } from "react-router-dom";
import { StoreOwnerLayout } from "../layouts";
import { AddProduct, Chats, Profile, Store, StoreOwnerDashboard } from "../pages/store-owner";
import { Clients, NewOrders, TodaySales } from "../pages/store-owner/dashboard";


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

    {/* ----------------------- Store owner dashboard routes and subroutes ------------------------ */}
    <Route path="/store-owner/:userId/dashboard" element={<StoreOwnerDashboard />} />
   {/* dashboard sub pages layout */}
    <Route path="/store-owner/:userId/dashboard/clients" element={<Clients />} />
    <Route path="/store-owner/:userId/dashboard/new-orders" element={<NewOrders />} />
    <Route path="/store-owner/:userId/dashboard/today-sales" element={<TodaySales />} />

    {/* ------------------------------ Store owner store routes ------------------------------------ */}
    <Route path="/store-owner/:userId/store" element={<Store />} ></Route>

    {/* --------------------------- Store owner chats routes ----------------------------------------*/}
    <Route path="/store-owner/:userId/chats" element={<Chats />} ></Route>

    {/* ------------------------------ Store owner products routes ----------------------------------*/}
    <Route path="/store-owner/:userId/add-product" element={<AddProduct />} ></Route>

    {/* ------------------------------ Store owner profile routes ------------------------------------*/}
    <Route path="/store-owner/:userId/profile" element={<Profile />} ></Route>
  </Route>
];

export default StoreOwnerRoutes;
