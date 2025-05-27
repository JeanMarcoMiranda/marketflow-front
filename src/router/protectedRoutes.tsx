import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { JSX } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
  element: JSX.Element;
}

export function ProtectedRoute({ allowedRoles, element }: ProtectedRouteProps) {
  const { userData } = useAuthStore();
  const userRole = userData?.role || "customer";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
}