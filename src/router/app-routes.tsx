import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "@/shared/layout/public-layout";
import PrivateLayout from "@/shared/layout/private-layout";
import PublicRoute from "./public-route";
import { Loadable } from "@/components/common/loadable";
import { lazy } from "react";

import PrivateRoute from "./private-route";
import ProductListPage from "@/pages/inventory/product-list-page";

// Private routes
const Dashboard = Loadable(
  lazy(() => import("@/pages/dashboard/dashboard-page"))
);

// Public Routes
const LoginPage = Loadable(lazy(() => import("@/pages/auth/login-page")));
const RegisterPage = Loadable(lazy(() => import("@/pages/auth/register-page")));
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
          // {
          //   path: "/orders",
          //   element: <OrdersPage />,
          // },
          {
            path: "/inventory",
            element: <ProductListPage />,
          },
          // {
          //   path: "/users",
          //   element: <UsersPage />,
          // },
          // {
          //   path: "/branches",
          //   element: <BranchesPage />,
          // },
          // {
          //   path: "/products",
          //   element: <ProductsPage />,
          // },
          // {
          //   path: "/business",
          //   element: (
          //     <ProtectedRoute allowedRoles={["developer"]} element={<BusinessPage />} />
          //   ),
          // },
          // {
          //   path: "/businessConfiguration",
          //   element: (
          //     <ProtectedRoute allowedRoles={["developer"]} element={<BusinessConfigurationPage />} />
          //   ),
          // },
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
