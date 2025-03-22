import type * as React from "react";
import {
  ClipboardList,
  Pizza,
  Truck,
  BookMarked,
  // User,
  Store,
  Package,
  Cookie,
} from "lucide-react";

import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import { TeamSwitcher } from "./TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/app/store/useAuthStore";
import { BranchSwitcher } from "./BranchSwitcher";

// This is sample data.
const data = {
  teams: [
    {
      name: "La Leña",
      logo: Pizza,
      plan: "Premium",
    },
  ],
  branches: [
    {
      name: "La Leña",
      logo: Pizza,
      plan: "Premium",
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: BookMarked,
    },
    {
      name: "Negocios",
      url: "/business",
      icon: Package,
    },
    {
      name: "Sucursales",
      url: "/branches",
      icon: Store,
    },
    {
      name: "Productos",
      url: "/products",
      icon: Cookie,
    },
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Obtenemos el usuario desde el store
  const { user: supabaseUser, userData } = useAuthStore();
  const userRole = userData?.role || "customer";

  const currentUser = {
    name: userData?.name || "Admin",
    email: supabaseUser?.user?.email || "admin@lalena.com",
    avatar: "/avatars/admin.jpg",
  };

  // Filtrar proyectos según el rol del usuario
  const filteredProjects = data.projects.filter((project) => {
    if (project.name === "Negocios" && userRole !== "developer") {
      return false; // Restringir la sección "Negocios" si el usuario no es developer
    }
    return true;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BranchSwitcher branches={data.branches} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={filteredProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
