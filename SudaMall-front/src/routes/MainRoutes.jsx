// src/routes/MainRoutes.tsx

import { Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import CustomerRoutes from "./CustomerRoutes";
import StoreOwnerRoutes from "./StoreOwnerRoutes";

/**
 * MainRoutes
 * ----------
 * Central routing configuration for the entire application.
 * 
 * Purpose:
 * - Combines all major route groups such as public, customer, and store owner routes.
 * - Keeps route definitions organized and modular.
 *
 * Structure:
 * - Uses <Routes> to hold all top-level route trees.
 * - Injects route elements returned from separate route modules like PublicRoutes and CustomerRoutes.
 *
 */

const MainRoutes = () => {
  return (
    <Routes>
      {PublicRoutes()}
      {CustomerRoutes()}
      {StoreOwnerRoutes()}
    </Routes>
  );
};

export default MainRoutes;
