import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/common/Sidebar/Sidebar";
import { Header } from "@/components/common/Header";
import { useBusiness } from "@/hooks/useBusiness";

export default function PrivateLayout() {
  const { business, isBusinessLoading, businessError, hasBusinessId } = useBusiness()

  if (!hasBusinessId) {
    return <div>No business ID found. Please log in or register a business.</div>;
  }

  if (isBusinessLoading) {
    return <div>Loading business data...</div>;
  }

  if (businessError) {
    return <div>Error: {businessError.message}</div>;
  }

  if (!business) {
    return <div>No business data available.</div>;
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
