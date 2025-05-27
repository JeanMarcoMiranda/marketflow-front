import { publicRoutes } from "./routesPublic";
import { privateRoutes } from "./routesPrivate";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/shared/layout/PublicLayout";
import PrivateLayout from "@/shared/layout/PrivateLayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: publicRoutes,
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: privateRoutes,
  },
]);
