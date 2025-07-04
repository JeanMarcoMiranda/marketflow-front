import { Inventory } from "@/api/types/response.types";
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Pencil } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

interface InventoryColumnsProps {
  onEdit: (inventory: Inventory) => void;
}

/**
 * Genera la definición de columnas para la tabla de inventario.
 */
export function getInventoryColumns({
  onEdit,
}: InventoryColumnsProps): ColumnDef<Inventory>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todas las filas"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "product.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Producto" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.product?.name ?? "Sin producto"}
        </div>
      ),
    },
    {
      accessorKey: "available_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cantidad Disponible" />
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("available_quantity")}</div>
      ),
    },
    {
      accessorKey: "reorder_level",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Nivel de Reabastecimiento"
        />
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("reorder_level")}</div>
      ),
    },
    {
      accessorKey: "minimum_stock_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock Mínimo" />
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {row.getValue("minimum_stock_quantity")}
        </div>
      ),
    },
    {
      accessorKey: "safety_stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock de Seguridad" />
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("safety_stock")}</div>
      ),
    },
    {
      accessorKey: "reorder_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cantidad a Reabastecer" />
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("reorder_quantity")}</div>
      ),
    },
    {
      accessorKey: "status_alert",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Alerta de Stock" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status_alert") as string | undefined;
        return status ? (
          <Badge
            variant={
              status.toLowerCase() === "low" ||
              status.toLowerCase() === "critical"
                ? "destructive"
                : "success"
            }
          >
            {status}
          </Badge>
        ) : (
          <span>-</span>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id) ?? "");
      },
    },
    {
      accessorKey: "storage_location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ubicación" />
      ),
      cell: ({ row }) => (
        <div>{row.getValue("storage_location") || "Sin asignar"}</div>
      ),
    },
    {
      accessorKey: "last_reorder_date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Último Reabastecimiento"
        />
      ),
      cell: ({ row }) => {
        const date = row.getValue("last_reorder_date");
        if (!date) return <div>-</div>;
        return (
          <div>
            {new Date(date as string).toLocaleString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de Creación" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return (
          <div>
            {date.toLocaleString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
            aria-label="Editar inventario"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
