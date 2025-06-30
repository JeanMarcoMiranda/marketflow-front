import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "@/shared/layout/public-layout";
import PrivateLayout from "@/shared/layout/private-layout";
import PublicRoute from "./public-route";
import { lazy } from "react";

import PrivateRoute from "./private-route";
import ProductListPage from "@/pages/inventory/product-list-page";
import { Loadable } from "@/components/common/Loadable";

// Private routes
const Dashboard = Loadable(
  lazy(() => import("@/pages/dashboard/dashboard-page"))
);

// Public Routes
const LoginPage = Loadable(lazy(() => import("@/pages/auth/login-page")));
const RegisterPage = Loadable(lazy(() => import("@/pages/auth/register-page")));
const BusinessConfigurationPage = Loadable(lazy(() => import("@/pages/business/business-configuration-page")));
const NotFound = Loadable(lazy(() => import("@/pages/not-found")));

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
            path: "/inventory",
            element: <ProductListPage />,
          },
          {
            path: "/businessConfiguration",
            element: <BusinessConfigurationPage />,
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
