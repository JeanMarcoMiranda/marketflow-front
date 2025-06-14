import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import PublicLayout from "@/shared/layout/PublicLayout";
import PrivateLayout from "@/shared/layout/PrivateLayout";
import PublicRoute from "./PublicRoute";
import { Loadable } from "@/components/common/Loadable";
import { lazy } from "react";
// import { ProtectedRoute } from "./protectedRoutes";
// import BusinessConfigurationPage from "@/features/BusinessConfiguration/pages";
import PrivateRoute from "./PrivateRoute";
import ProductListPage from "@/pages/inventory/ProductListPage";

// Private routes
const Dashboard = Loadable(
  lazy(() => import("@/pages/dashboard/DashboardPage"))
);
// const OrdersPage = Loadable(
//   lazy(() => import("@/features/Orders/pages/Orders"))
// );
// const UsersPage = Loadable(lazy(() => import("@/features/Users/pages/Users")));
// const BranchesPage = Loadable(lazy(() => import("@/features/Branches/pages")));
// const BusinessPage = Loadable(lazy(() => import("@/features/Business/pages")));
// const ProductsPage = Loadable(lazy(() => import("@/features/Products/pages")));

// Public Routes
const LoginPage = Loadable(lazy(() => import("@/pages/auth/LoginPage")));
const RegisterPage = Loadable(
  lazy(() => import("@/pages/auth/RegisterPage"))
);
const NotFound = Loadable(
  lazy(() => import("@/pages/NotFound"))
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
    ]
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
        ]
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const AppRoutes = () => <RouterProvider router={Router} />;

export default AppRoutes;

