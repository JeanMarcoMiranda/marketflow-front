import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Edit, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Branch } from "@/api/types/response.types";
import { getInitials } from "@/lib/get-initials";
import { useUserPreferencesStore } from "@/store/use-user-preferences-store";

interface BranchSwitcherProps {
  branches: Branch[];
  isBranchesLoading?: boolean;
  onAddBranchClick: () => void;
}

export function BranchSwitcher({
  branches,
  isBranchesLoading = false,
  onAddBranchClick,
}: Readonly<BranchSwitcherProps>) {
  const { isMobile } = useSidebar();
  const { selected_branch_id, setSelectedBranch } = useUserPreferencesStore();
  const defaultBranch =
    selected_branch_id !== null
      ? branches.find((branch) => branch.id === selected_branch_id)
      : null;
  const [activeBranch, setActiveBranch] = React.useState<Branch | undefined>(
    defaultBranch ?? undefined
  );

  // Update activeBranch when branches change (e.g., after loading)
  useEffect(() => {
    if (branches.length > 0 && !activeBranch) {
      setActiveBranch(branches[0]);
    }
  }, [branches, activeBranch]);

  if (isBranchesLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200">
              <span className="text-sm font-medium">...</span>
            </div>
            <span className="truncate font-semibold">Loading...</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (branches.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link to="/business-configuration">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200">
                <Plus className="size-4" />
              </div>
              <span className="truncate font-semibold">Add Branch</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

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
                {activeBranch?.image_url ? (
                  <img
                    src={activeBranch.image_url}
                    alt={activeBranch.name}
                    className="size-6 rounded-sm object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {getInitials(activeBranch?.name ?? "Branch")}
                  </span>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeBranch?.name ?? "Select Branch"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown content */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <div className="flex items-center justify-between gap-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Business
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/business-configuration">
                    <Edit className="size-4 flex-shrink-0" />
                  </Link>
                </Button>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Branches
            </DropdownMenuLabel>
            {branches.map((branch, index) => (
              <DropdownMenuItem
                key={branch.id}
                onClick={() => {
                  setActiveBranch(branch);
                  setSelectedBranch(branch.id);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {branch.image_url ? (
                    <img
                      src={branch.image_url}
                      alt={branch.name}
                      className="size-5 rounded-sm object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium">
                      {getInitials(branch.name)}
                    </span>
                  )}
                </div>
                <span className="truncate">{branch.name}</span>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="gap-2 p-2"
              onSelect={() => onAddBranchClick()}
            >
              <div className="flex">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add Branch
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
