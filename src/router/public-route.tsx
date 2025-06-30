import { useAuthStore } from "@/store/use-auth-store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
