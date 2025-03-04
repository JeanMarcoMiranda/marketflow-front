import type * as React from "react";
import {
  ClipboardList,
  Pizza,
  Truck,
  BookMarked,
  User,
  Store,
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

// This is sample data.
const data = {
  teams: [
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
    {
      name: "Usuarios",
      url: "/users",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Obtenemos el usuario desde el store
  const { user: supabaseUser } = useAuthStore();

  const currentUser = {
    name: "Usuario",
    email: supabaseUser?.user?.email || "admin@lalena.com",
    avatar: "/avatars/admin.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
