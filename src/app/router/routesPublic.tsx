import { Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/Register";
import NotFound from "@/features/NotFound/pages/NotFound";

export const publicRoutes = [
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
  {
    path: "*",
    element: <NotFound />,
  },
];
