import type React from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export function NavProjects({
  groupName,
  projects,
}: Readonly<{
  groupName: string
  readonly projects: readonly {
    readonly name?: string
    readonly title?: string
    readonly url: string
    readonly icon: LucideIcon | React.ComponentType
    readonly category?: string
  }[]
}>) {
  const location = useLocation()

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "main":
        return "text-primary"
      case "inventory":
        return "text-info"
      case "operations":
        return "text-warning"
      case "sales":
        return "text-success"
      case "analytics":
        return "text-accent"
      case "settings":
        return "text-muted-foreground"
      case "support":
        return "text-muted-foreground"
      default:
        return "text-sidebar-foreground"
    }
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden px-0 py-2">
      <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
        {groupName}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1 px-2">
        {projects.map((item) => {
          const isActive = location.pathname === item.url
          const displayName = item.name ?? item.title

          return (
            <SidebarMenuItem key={displayName}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "group relative h-9 w-full justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20"
                    : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground active:scale-[0.98]",
                )}
                tooltip={displayName}
              >
                <Link to={item.url} className="flex items-center gap-3 w-full">
                  <item.icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors duration-200",
                      isActive ? "text-primary-foreground" : getCategoryColor(item.category),
                    )}
                  />
                  <span className="truncate group-data-[collapsible=icon]:hidden">{displayName}</span>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-l-full bg-primary-foreground/80" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

