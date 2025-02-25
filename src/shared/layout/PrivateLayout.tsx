import { useAuth } from "@/shared/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
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
        <Header />
        <main className="flex h-full flex-1 flex-col space-y-8 p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
