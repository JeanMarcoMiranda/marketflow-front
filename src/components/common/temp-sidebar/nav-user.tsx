import { Bell, ChevronsUpDown, LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { Badge } from "@/components/ui/badge"

export function NavUser({
  user,
}: {
  readonly user: {
    readonly name: string
    readonly email: string
    readonly avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/auth/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
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
              <Avatar className="h-8 w-8 rounded-lg border-2 border-primary/20 transition-all duration-200 group-hover:border-primary/40">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">{user.name}</span>
                <span className="truncate text-xs text-sidebar-foreground/70">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border border-sidebar-border/50 bg-popover shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 text-left text-sm border-b border-border/50">
                <Avatar className="h-8 w-8 rounded-lg border border-primary/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                  Activo
                </Badge>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem className="gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent/50">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent/50">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span>Notificaciones</span>
                <Badge variant="destructive" className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/50" />

            <div className="p-1">
              <DropdownMenuItem
                onClick={handleLogout}
                className="gap-3 rounded-md px-3 py-2 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}