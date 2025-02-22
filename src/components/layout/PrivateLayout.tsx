import { useAuth } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";

export default function PrivateLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header/>
        <Outlet /> {/* Aquí se renderizan las páginas privadas */}
      </SidebarInset>
    </SidebarProvider>
  );
}
