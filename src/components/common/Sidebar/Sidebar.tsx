import type * as React from "react";
import {
  ClipboardList,
  Pizza,
  Truck,
  BookMarked,
  // User,
} from "lucide-react";

import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BranchSwitcher } from "./BranchSwitcher";
import { Branch } from "@/api/types/response.types";
import { useDialogStore } from "@/store/useDialogStore";
import { CreateBranchForm } from "@/components/features/branch/CreateBranch/CreateBranchForm";
import { useAuth } from "@/hooks/useAuth";

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
      name: "Dashboard",
      url: "/dashboard",
      icon: BookMarked,
    },
    // {
    //   name: "Negocios",
    //   url: "/business",
    //   icon: Package,
    // },
    // {
    //   name: "Sucursales",
    //   url: "/branches",
    //   icon: Store,
    // },
    // {
    //   name: "Productos",
    //   url: "/products",
    //   icon: Cookie,
    // },
    {
      name: "Inventario",
      url: "/inventory",
      icon: ClipboardList,
    },
    {
      name: "Envios",
      url: "/orders",
      icon: Truck,
    },
    // {
    //   name: "Usuarios",
    //   url: "/users",
    //   icon: User,
    // },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  businessBranches: Branch[];
  onBranchesRefetch: () => void
};

export function AppSidebar({ businessBranches, onBranchesRefetch, ...props }: AppSidebarProps) {
  const { openDialog, closeDialog } = useDialogStore();
  const { userData } = useAuth()

  const openCreateBranchModal = () => {
    openDialog(
      <CreateBranchForm
        onSuccess={async () => {
          closeDialog();
          onBranchesRefetch()
        }}
      />,
      { title: "Create New Branch", maxWidth: "xl" }
    );
  };

  // Obtenemos el usuario desde el store
  // const { user: supabaseUser, userData } = useAuthStore();
  // const userRole = userData?.role || "customer";

  const currentUser = {
    name: userData?.name || "Admin",
    email: userData?.email || "admin@lalena.com",
    avatar: "/avatars/admin.jpg",
  };

  // Filtrar proyectos según el rol del usuario
  // const filteredProjects = data.projects.filter((project) => {
  //   if (project.name === "Negocios" && userRole !== "developer") {
  //     return false; // Restringir la sección "Negocios" si el usuario no es developer
  //   }
  //   return true;
  // });

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