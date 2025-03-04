import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Loadable } from "@/shared/components/Loadable";

const LoginPage = Loadable(lazy(() => import("@/features/auth/pages/Login")));
const RegisterPage = Loadable(
  lazy(() => import("@/features/auth/pages/Register"))
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
