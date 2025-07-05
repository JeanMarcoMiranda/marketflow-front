// src/components/features/orders/orders-table/columns.ts
import { DataTableColumnHeader } from "@/components/common/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Pencil } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "@/api/types/orders.types";

interface OrderColumnsProps {
  onEdit: (order: Order) => void;
}

export function getOrderColumns({
  onEdit,
}: OrderColumnsProps): ColumnDef<Order>[] {
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
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "id_user",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Usuario" />
      ),
      cell: ({ row }) => <div>{row.getValue("id_user")}</div>,
    },
    {
      accessorKey: "id_branch",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sucursal" />
      ),
      cell: ({ row }) => <div>{row.getValue("id_branch")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as Order["status"];
        let variant:
          | "default"
          | "success"
          | "secondary"
          | "destructive"
          | "outline" = "default";
        switch (status) {
          case "Pendiente":
            variant = "secondary";
            break;
          case "Enviado":
            variant = "default";
            break;
          case "Recibido":
            variant = "success";
            break;
          case "Cancelado":
            variant = "destructive";
            break;
        }
        return <Badge variant={variant}>{status}</Badge>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "request_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de Solicitud" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("request_date");
        return (
          <div>
            {new Date(date as string).toLocaleString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "delivery_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de Entrega" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("delivery_date");
        return date ? (
          <div>
            {new Date(date as string).toLocaleString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        ) : (
          <div>-</div>
        );
      },
    },
    {
      accessorKey: "total_cost",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Costo Total" />
      ),
      cell: ({ row }) => (
        <div className="text-right">
          ${Number(row.getValue("total_cost")).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "total_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cantidad Total" />
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("total_quantity")}</div>
      ),
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
            aria-label="Editar orden"
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
