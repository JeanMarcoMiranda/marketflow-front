import type * as React from "react";
import { ClipboardList, Pizza, Truck, BookMarked} from "lucide-react";

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

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "admin@lalena.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "La Leña",
      logo: Pizza, // Un ícono relacionado con fuego u horno
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
      name: "Envios",
      url: "/orders",
      icon: Truck,
    },
    {
      name: "Inventario",
      url: "/inventory",
      icon: ClipboardList,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
