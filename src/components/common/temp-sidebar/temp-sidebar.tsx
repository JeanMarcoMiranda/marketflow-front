import type * as React from "react"
import { IconChartBar, IconHelp, IconSettings } from "@tabler/icons-react"
import { ClipboardList, Pizza, Truck, BookMarked, Package, Calendar } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import type { Branch } from "@/api/types/response.types"
import { useDialogStore } from "@/store/use-dialog-store"
import { CreateBranchForm } from "@/components/features/branch/create-branch/create-branch-form"
import { useAuth } from "@/hooks/use-auth"
import { BranchSwitcher } from "./branch-switcher"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"

const data = {
  proyectos: [
    {
      name: "Panel de control",
      url: "/dashboard",
      icon: BookMarked,
      category: "main",
    },
    {
      name: "Productos",
      url: "/products",
      icon: ClipboardList,
      category: "inventory",
    },
    {
      name: "Inventario",
      url: "/inventory",
      icon: Package,
      category: "inventory",
    },
    {
      name: "Envios",
      url: "/orders",
      icon: Truck,
      category: "operations",
    },
    {
      name: "Calendario",
      url: "/calendar",
      icon: Calendar,
      category: "operations",
    },
    {
      name: "Ventas",
      url: "/sales",
      icon: Pizza,
      category: "sales",
    },
  ],
  Ajustes: [
    {
      title: "Configuración",
      url: "/settings",
      icon: IconSettings,
      category: "settings",
    },
    {
      title: "Obtener ayuda",
      url: "/help",
      icon: IconHelp,
      category: "support",
    },
    {
      title: "Reportes",
      url: "/reports",
      icon: IconChartBar,
      category: "analytics",
    },
  ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  businessBranches: Branch[]
  onBranchesRefetch: () => void
}

export function AppSidebar({ businessBranches, onBranchesRefetch, ...props }: AppSidebarProps) {
  const { openDialog, closeDialog } = useDialogStore()
  const { userData } = useAuth()

  const openCreateBranchModal = () => {
    openDialog(
      <CreateBranchForm
        onSuccess={async () => {
          closeDialog()
          onBranchesRefetch()
        }}
      />,
      { title: "Crear nueva Sucursal", maxWidth: "xl" },
    )
  }

  const currentUser = {
    name: userData?.name ?? "Admin",
    email: userData?.email ?? "admin@admin.com",
    avatar: "/avatars/admin.jpg",
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/60 shadow-sm" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/40 bg-gradient-to-r from-sidebar to-sidebar/95">
        <BranchSwitcher branches={businessBranches} onAddBranchClick={openCreateBranchModal} />
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2 py-4">
        {Object.entries(data).map(([groupKey, items]) => (
          <NavProjects
            key={groupKey}
            groupName={groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
            projects={items}
          />
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/40 bg-gradient-to-r from-sidebar to-sidebar/95 p-2">
        <NavUser user={currentUser} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}