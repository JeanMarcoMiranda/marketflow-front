import { lazy } from "react";
import { Loadable } from "@/shared/components/Loadable";

const Dashboard = Loadable(
  lazy(() => import("@/features/Dashboard/pages/Dashboard"))
);
const OrdersPage = Loadable(
  lazy(() => import("@/features/Orders/pages/Orders"))
);
const InventoryPage = Loadable(
  lazy(() => import("@/features/Inventory/pages/Inventory"))
);
const UsersPage = Loadable(lazy(() => import("@/features/Users/pages/Users")));
const BranchesPage = Loadable(lazy(() => import("@/features/Branches/pages")));

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
];
