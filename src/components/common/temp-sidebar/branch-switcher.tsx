import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, Edit, Plus, Loader2 } from "lucide-react"
import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import type { Branch } from "@/api/types/response.types"
import { getInitials } from "@/lib/get-initials"
import { useUserPreferencesStore } from "@/store/use-user-preferences-store"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BranchSwitcherProps {
  branches: Branch[]
  isBranchesLoading?: boolean
  onAddBranchClick: () => void
}

export function BranchSwitcher({
  branches,
  isBranchesLoading = false,
  onAddBranchClick,
}: Readonly<BranchSwitcherProps>) {
  const { isMobile } = useSidebar()
  const { selected_branch_id, setSelectedBranch } = useUserPreferencesStore()

  const defaultBranch = selected_branch_id !== null ? branches.find((branch) => branch.id === selected_branch_id) : null

  const [activeBranch, setActiveBranch] = React.useState<Branch | undefined>(defaultBranch ?? undefined)

  useEffect(() => {
    if (branches.length > 0 && !activeBranch) {
      setActiveBranch(branches[0])
      setSelectedBranch(branches[0].id)
    }
  }, [branches, activeBranch, setSelectedBranch])

  if (isBranchesLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            disabled
            className="h-12 w-full rounded-lg border border-sidebar-border/30 bg-sidebar-accent/20"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-muted-foreground">Cargando...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (branches.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            asChild
            className="h-12 w-full rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10"
          >
            <Link to="/business-configuration" className="flex items-center gap-3">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-primary">Agregar Sucursal</span>
                <span className="truncate text-xs text-primary/70">Configura tu primera sucursal</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group h-12 w-full rounded-lg border border-sidebar-border/50 bg-sidebar-accent/30 transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=open]:shadow-sm"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
                {activeBranch?.image_url ? (
                  <img
                    src={activeBranch.image_url || "/placeholder.svg"}
                    alt={activeBranch.name}
                    className="size-6 rounded-sm object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">{getInitials(activeBranch?.name ?? "Branch")}</span>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">
                  {activeBranch?.name ?? "Seleccionar Sucursal"}
                </span>
                <span className="truncate text-xs text-sidebar-foreground/70">Sucursal activa</span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border border-sidebar-border/50 bg-popover shadow-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Negocio
              </DropdownMenuLabel>
              <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
                <Link to="/business-configuration">
                  <Edit className="h-3 w-3" />
                </Link>
              </Button>
            </div>

            <DropdownMenuSeparator className="bg-border/50" />

            <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sucursales ({branches.length})
            </DropdownMenuLabel>

            <div className="max-h-64 overflow-y-auto">
              {branches.map((branch, index) => {
                const isActive = activeBranch?.id === branch.id

                return (
                  <DropdownMenuItem
                    key={branch.id}
                    onClick={() => {
                      setActiveBranch(branch)
                      setSelectedBranch(branch.id)
                    }}
                    className={cn(
                      "mx-1 gap-3 rounded-md px-3 py-2 transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-6 items-center justify-center rounded-sm border transition-colors",
                        isActive ? "border-primary/30 bg-primary/10" : "border-border bg-background",
                      )}
                    >
                      {branch.image_url ? (
                        <img
                          src={branch.image_url || "/placeholder.svg"}
                          alt={branch.name}
                          className="size-5 rounded-sm object-cover"
                        />
                      ) : (
                        <span
                          className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}
                        >
                          {getInitials(branch.name)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <span className="truncate font-medium">{branch.name}</span>
                      {isActive && (
                        <Badge
                          variant="secondary"
                          className="ml-2 h-5 bg-success/10 text-success border-success/20 text-xs"
                        >
                          Activa
                        </Badge>
                      )}
                    </div>
                    <DropdownMenuShortcut className="text-muted-foreground/50">⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )
              })}
            </div>

            <DropdownMenuSeparator className="bg-border/50" />

            <DropdownMenuItem
              onSelect={() => onAddBranchClick()}
              className="mx-1 gap-3 rounded-md px-3 py-2 text-primary transition-colors hover:bg-primary/10 focus:bg-primary/10"
            >
              <div className="flex size-6 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <div className="font-medium">Agregar Sucursal</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}