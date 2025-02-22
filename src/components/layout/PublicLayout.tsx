import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function PublicLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      {/* <h1>Página Pública</h1> */}
      <Outlet /> {/* Aquí se renderizan las páginas públicas */}
    </div>
  );
}
