import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/common/sidebar/sidebar";
import { useBusiness } from "@/hooks/use-business";
import { Header } from "@/components/common/header";

export default function PrivateLayout() {
  const {
    refetchBranches,
    business,
    businessError,
    branches,
    branchesError,
    hasBusinessId,
    isAnyLoading,
    hasAnyError,
  } = useBusiness();

  if (!hasBusinessId) {
    return (
      <div>No business ID found. Please log in or register a business.</div>
    );
  }

  if (isAnyLoading) {
    return <div>Loading data...</div>;
  }

  if (hasAnyError) {
    return (
      <div>
        {businessError && <p>Business error: {businessError.message}</p>}
        {branchesError && <p>Branches error: {branchesError.message}</p>}
      </div>
    );
  }

  if (!business) {
    return <div>No business data available.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        businessBranches={branches ?? []}
        onBranchesRefetch={() => {
          refetchBranches();
        }}
      />
      <SidebarInset>
        <Header />
        <main className="flex h-full flex-1 flex-col space-y-8 p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
