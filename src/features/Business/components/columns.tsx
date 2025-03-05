import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Business } from "../data/models/businessSchema";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { DataTableRowActions } from "@/components/common/data-table-row-actions";

/**
 * Genera la definición de columnas para la tabla de negocios.
 * @param openEditModal Función para abrir el modal de edición.
 * @param openDeleteModal Función para abrir el modal de eliminación.
 */
export function getBusinessColumns(
  openEditModal: (business: Business) => void,
  openDeleteModal: (business: Business) => void
): ColumnDef<Business>[] {
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
        <DataTableColumnHeader column={column} title="Nombre del Negocio" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "business_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tipo de Negocio" />
      ),
      cell: ({ row }) => <div>{row.getValue("business_type")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descripción" />
      ),
      cell: ({ row }) => (
        <div>{row.getValue("description") || "Sin descripción"}</div>
      ),
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
