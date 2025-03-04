import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Inventory } from "../data/models/inventorySchema";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { DataTableRowActions } from "@/components/common/data-table-row-actions";

/**
 * Genera la definición de columnas para la tabla de inventario.
 * @param openEditModal Función para abrir el modal de edición.
 * @param openDeleteModal Función para abrir el modal de eliminación.
 */
export function getInventoryColumns(
  openEditModal: (inventory: Inventory) => void,
  openDeleteModal: (inventory: Inventory) => void
): ColumnDef<Inventory>[] {
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
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id_product",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID del Producto" />
      ),
      cell: ({ row }) => <div>{row.getValue("id_product")}</div>,
    },
    {
      accessorKey: "available_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cantidad Disponible" />
      ),
      cell: ({ row }) => <div>{row.getValue("available_quantity")}</div>,
    },
    {
      accessorKey: "reorder_level",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nivel de Reorden" />
      ),
      cell: ({ row }) => <div>{row.getValue("reorder_level")}</div>,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de Creación" />
      ),
      cell: ({ row }) => (
        <div>{new Date(row.getValue("created_at")).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "last_updated",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Última Actualización" />
      ),
      cell: ({ row }) => (
        <div>{new Date(row.getValue("last_updated")).toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          defaultActions={{
            onEdit: () => {
              openEditModal(row.original);
            },
            onDelete: () => {
              openDeleteModal(row.original);
            },
          }}
        />
      ),
    },
  ];
}
