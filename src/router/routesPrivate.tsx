import { lazy } from "react";
import { ProtectedRoute } from "./protectedRoutes";
import BusinessConfigurationPage from "@/features/BusinessConfiguration/pages";
import { Loadable } from "@/components/common/Loadable";

const Dashboard = Loadable(
  lazy(() => import("@/features/Dashboard/pages/Dashboard"))
);
const OrdersPage = Loadable(
  lazy(() => import("@/features/Orders/pages/Orders"))
);
const InventoryPage = Loadable(
  lazy(() => import("@/features/Inventory/index"))
);
const UsersPage = Loadable(lazy(() => import("@/features/Users/pages/Users")));
const BranchesPage = Loadable(lazy(() => import("@/features/Branches/pages")));
const BusinessPage = Loadable(lazy(() => import("@/features/Business/pages")));
const ProductsPage = Loadable(lazy(() => import("@/features/Products/pages")));

export const privateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/inventory",
    element: <InventoryPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/branches",
    element: <BranchesPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/business",
    element: (
      <ProtectedRoute allowedRoles={["developer"]} element={<BusinessPage />} />
    ),
  },
  {
    path: "/businessConfiguration",
    element: (
      <ProtectedRoute allowedRoles={["developer"]} element={<BusinessConfigurationPage />} />
    ),
  },
];
