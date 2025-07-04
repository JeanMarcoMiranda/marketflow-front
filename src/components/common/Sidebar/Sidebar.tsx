import type * as React from "react";
import { ClipboardList, Pizza, Truck, BookMarked, Package } from "lucide-react";

import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BranchSwitcher } from "./branch-switcher";
import { Branch } from "@/api/types/response.types";
import { useDialogStore } from "@/store/use-dialog-store";
import { CreateBranchForm } from "@/components/features/branch/create-branch/create-branch-form";
import { useAuth } from "@/hooks/use-auth";

// This is sample data.
const data = {
  branches: [
    {
      name: "La Leña",
      logo: Pizza,
    },
  ],
  projects: [
    {
      name: "	Panel de control",
      url: "/dashboard",
      icon: BookMarked,
    },
    {
      name: "Productos",
      url: "/products",
      icon: ClipboardList,
    },
    {
      name: "Inventario",
      url: "/inventory",
      icon: Package,
    },
    {
      name: "Envios",
      url: "/orders",
      icon: Truck,
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  businessBranches: Branch[];
  onBranchesRefetch: () => void;
};

export function AppSidebar({
  businessBranches,
  onBranchesRefetch,
  ...props
}: AppSidebarProps) {
  const { openDialog, closeDialog } = useDialogStore();
  const { userData } = useAuth();

  const openCreateBranchModal = () => {
    openDialog(
      <CreateBranchForm
        onSuccess={async () => {
          closeDialog();
          onBranchesRefetch();
        }}
      />,
      { title: "Crear nueva Sucursal", maxWidth: "xl" }
    );
  };

  const currentUser = {
    name: userData?.name ?? "Admin",
    email: userData?.email ?? "admin@lalena.com",
    avatar: "/avatars/admin.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BranchSwitcher
          branches={businessBranches}
          onAddBranchClick={openCreateBranchModal}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
