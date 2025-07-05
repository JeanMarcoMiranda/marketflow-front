import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "@/shared/layout/public-layout";
import PrivateLayout from "@/shared/layout/private-layout";
import PublicRoute from "./public-route";
import { lazy } from "react";
import SalesPage from "@/pages/sales/sales-page";
import PrivateRoute from "./private-route";
import { Loadable } from "@/components/common/temp-loadable";

// Private routes
const Dashboard = Loadable(
  lazy(() => import("@/pages/dashboard/dashboard-page"))
);
const ProductListPage = Loadable(
  lazy(() => import("@/pages/product/product-list-page"))
);
const InventoryListPage = Loadable(
  lazy(() => import("@/pages/inventory/inventory-list-page"))
);
const HelpPage = Loadable(lazy(() => import("@/pages/help/help-page")));

// Public Routes
const LoginPage = Loadable(lazy(() => import("@/pages/auth/login-page")));
const RegisterPage = Loadable(lazy(() => import("@/pages/auth/register-page")));
const BusinessConfigurationPage = Loadable(
  lazy(() => import("@/pages/business/business-configuration-page"))
);
const NotFound = Loadable(lazy(() => import("@/pages/not-found")));
const CalendarGridPage = Loadable(
  lazy(() => import("@/pages/calendar/calendar-grid-page"))
);

export const Router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/auth/login" replace />,
          },
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
          {
            path: "/auth/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/products",
            element: <ProductListPage />,
          },
          {
            path: "/inventory",
            element: <InventoryListPage />,
          },
          {
            path: "/business-configuration",
            element: <BusinessConfigurationPage />,
          },
          {
            path: "/sales",
            element: <SalesPage />,
          },
          {
            path: "/orders",
            element: <SalesPage />,
          },
          {
            path: "/calendar",
            element: <CalendarGridPage />,
          },
          {
            path: "/help",
            element: <HelpPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRoutes = () => <RouterProvider router={Router} />;

export default AppRoutes;
