import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Define la estructura de una acción personalizada.
 */
export interface CustomAction {
  label: string;
  onClick: () => void;
}

interface DataTableRowActionsProps {
  /**
   * Si es true (por defecto), se muestran las acciones de Edit y Delete.
   */
  showDefaultActions?: boolean;
  /**
   * Callbacks para las acciones por defecto.
   */
  defaultActions?: {
    onEdit?: () => void;
    onDelete?: () => void;
  };
  /**
   * Acciones personalizadas adicionales.
   */
  customActions?: CustomAction[];
}

/**
 * DataTableRowActions renderiza un menú desplegable con acciones.
 * Permite usar acciones por defecto (Edit y Delete) y/o personalizadas.
 */
export function DataTableRowActions({
  showDefaultActions = true,
  defaultActions,
  customActions,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {showDefaultActions && (
          <>
            <DropdownMenuItem onClick={defaultActions?.onEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={defaultActions?.onDelete}>
              Delete
            </DropdownMenuItem>
            {customActions && customActions.length > 0 && (
              <DropdownMenuSeparator />
            )}
          </>
        )}
        {customActions &&
          customActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
