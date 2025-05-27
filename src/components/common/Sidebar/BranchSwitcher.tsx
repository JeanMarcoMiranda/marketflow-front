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
import { ChevronsUpDown, Edit, Plus } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function BranchSwitcher({
  branches,
}: {
  branches: {
    name: string
    logo: React.ElementType
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeBranch, setActiveBranch] = React.useState(branches[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeBranch.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeBranch.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <div className="flex items-center justify-between gap-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Business</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/businessConfiguration">
                    <Edit className="size-4 flex-shrink-0" />
                  </Link>
                </Button>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">Sucursales</DropdownMenuLabel>
            {branches.map((branch, index) => (
              <DropdownMenuItem key={branch.name} onClick={() => setActiveBranch(branch)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <branch.logo className="size-4 shrink-0" />
                </div>
                {branch.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Agreagar Sucursal</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

