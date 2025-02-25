import UsersPage from "@/features/Users/pages/Users";
import BranchesPage from "@/features/Branches/pages";
import OrdersPage from "@/features/Orders/pages/Orders";
import Dashboard from "@/features/Dashboard/pages/Dashboard";
import InventoryPage from "@/features/Inventory/pages/Inventory";

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
  //   {
  //     path: "/profile",
  //     element: <Profile />,
  //   },
];
