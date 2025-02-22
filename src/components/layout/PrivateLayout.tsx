import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      <h1>Panel Privado</h1>
      <Outlet /> {/* Aquí se renderizan las páginas privadas */}
    </div>
  );
}
