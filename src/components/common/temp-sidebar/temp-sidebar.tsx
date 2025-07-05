import type * as React from "react";
import { IconChartBar, IconHelp, IconSettings } from "@tabler/icons-react";
import {
  ClipboardList,
  Pizza,
  Truck,
  BookMarked,
  Package,
  Calendar,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Branch } from "@/api/types/response.types";
import { useDialogStore } from "@/store/use-dialog-store";
import { CreateBranchForm } from "@/components/features/branch/create-branch/create-branch-form";
import { useAuth } from "@/hooks/use-auth";
import { BranchSwitcher } from "./branch-switcher";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

const data = {
  proyectos: [
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
    {
      name: "Calendario",
      url: "/calendar",
      icon: Calendar,
    },
    {
      name: "Ventas",
      url: "/sales",
      icon: Pizza,
    },
  ],
  Ajustes: [
    {
      title: "Configuración",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Obtener ayuda",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Reportes",
      url: "/reports",
      icon: IconChartBar,
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
    email: userData?.email ?? "admin@admin.com",
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
        {Object.entries(data).map(([groupKey, items]) => (
          <NavProjects
            key={groupKey}
            groupName={groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
            projects={items}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
