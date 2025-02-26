import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch } from "../data/models/branchSchema";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { DataTableRowActions } from "@/components/common/data-table-row-actions";

/**
 * Genera la definición de columnas para la tabla de sucursales.
 * @param openEditModal Función para abrir el modal de edición.
 * @param openDeleteModal Función para abrir el modal de eliminación.
 */
export function getColumns(
  openEditModal: (branch: Branch) => void,
  openDeleteModal: (branch: Branch) => void
): ColumnDef<Branch>[] {
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Localización" />
      ),
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de creación" />
      ),
      cell: ({ row }) => (
        <div>{new Date(row.getValue("created_at")).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "id_user",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID usuario" />
      ),
      cell: ({ row }) => <div>{row.getValue("id_user")}</div>,
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
