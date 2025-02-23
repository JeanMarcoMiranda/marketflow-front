import Dashboard from "@/features/Dashboard/pages/Dashboard";
import InventoryPage from "@/features/Inventory/pages/Inventory";
import OrdersPage from "@/features/Orders/pages/Orders";

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
  //   {
  //     path: "/profile",
  //     element: <Profile />,
  //   },
];
