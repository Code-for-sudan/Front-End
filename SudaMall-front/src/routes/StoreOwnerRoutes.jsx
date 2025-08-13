import { Route } from "react-router-dom";
import { StoreOwnerLayout } from "../layouts";
import { Profile, Store, StoreOwnerDashboard } from "../pages/store-owner";
import { Chats, ChatArea } from "../pages/shared-pages/chats";
import { TotalSales } from "../pages/store-owner/dashboard";
import { NewClients } from "../pages/store-owner/dashboard/clients";
import { NewOrders } from "../pages/store-owner/dashboard/orders";
import { Products } from "../pages/store-owner/products";
import OrdersPage from "../pages/store-owner/orders/OrdersPage";
import OrderDetailsPage from "../pages/store-owner/orders/OrderDetailsPage";
import { EditProduct } from "../components/store-owner/products";


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
    <Route path="/store-owner/:userId/dashboard/new-clients" element={<NewClients />} />
    <Route path="/store-owner/:userId/dashboard/new-orders" element={<NewOrders />} />
    <Route path="/store-owner/:userId/dashboard/total-sales" element={<TotalSales />} />

    {/* ------------------------------ Store owner store routes ------------------------------------ */}
    <Route path="/store-owner/:userId/my-store" element={<Store />} ></Route>

    {/* --------------------------- Store owner chats routes ----------------------------------------*/}
    <Route path="/store-owner/:userId/chats" element={<Chats />} ></Route>
    <Route path="/store-owner/:userId/chats/:contactId" element={<ChatArea />} ></Route>

    {/* ------------------------------ Store owner products routes ----------------------------------*/}
    <Route path="/store-owner/:userId/products" element={<Products />} ></Route>
    <Route path="/store-owner/:userId/products/edit/:product_id" element={<EditProduct />} ></Route>
    
        {/* ------------------------------ Store owner orders routes ----------------------------------*/}
    <Route path="/store-owner/:userId/orders" element={<OrdersPage />} ></Route>
    <Route path="/store-owner/:userId/orders/:orderId" element={<OrderDetailsPage/>} ></Route>

    {/* ------------------------------ Store owner profile routes ------------------------------------*/}
    <Route path="/store-owner/:userId/profile" element={<Profile />} ></Route>
  </Route>
];

export default StoreOwnerRoutes;
