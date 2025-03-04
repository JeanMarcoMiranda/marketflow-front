import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "../data/models/productSchema";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { DataTableRowActions } from "@/components/common/data-table-row-actions";

/**
 * Genera la definición de columnas para la tabla de productos.
 * @param openEditModal Función para abrir el modal de edición.
 * @param openDeleteModal Función para abrir el modal de eliminación.
 */
export function getColumns(
  openEditModal: (product: Product) => void,
  openDeleteModal: (product: Product) => void
): ColumnDef<Product>[] {
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
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descripción" />
      ),
      cell: ({ row }) => (
        <div>{row.getValue("description") || "Sin descripción"}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Precio" />
      ),
      cell: ({ row }) => {
        const price = row.getValue("price") as number; // Cast a number
        return <div>S/. {price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categoría" />
      ),
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => (
        <div>{row.getValue("is_active") ? "Activo" : "Inactivo"}</div>
      ),
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
