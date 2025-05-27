import { Loadable } from "@/components/common/Loadable";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = Loadable(lazy(() => import("@/pages/auth/LoginPage")));
const RegisterPage = Loadable(
  lazy(() => import("@/pages/auth/RegisterPage"))
);
const NotFound = Loadable(
  lazy(() => import("@/features/NotFound/pages/NotFound"))
);

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
