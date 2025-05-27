import { Outlet, Navigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/common/Sidebar/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { Header } from "@/components/common/Header";

export default function PrivateLayout() {
  const { userSession } = useAuthStore();

  if (!userSession) {
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
