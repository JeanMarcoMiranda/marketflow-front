// src/components/features/orders/orders-table/orders-table.tsx
import { DataTable } from "@/components/common/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useDialogStore } from "@/store/use-dialog-store";
import { getOrderColumns } from "./columns";
import type { Order } from "@/api/types/orders.types";
import { useOrders } from "@/hooks/use-orders";
import { OrderForm } from "../orders-form/orders-form";

function OrdersTable() {
  const {
    orders,
    loading,
    error,
    refreshOrders,
    createOrder,
    updateOrder,
    isCreating,
    isUpdating,
    createError,
    updateError,
  } = useOrders();

  const { openDialog, closeDialog } = useDialogStore();

  const handleSuccess = () => {
    closeDialog();
    refreshOrders();
  };

  const handleCancel = () => {
    closeDialog();
  };

  const openCreateOrderModal = () => {
    openDialog(
      <OrderForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        createOrder={createOrder}
        updateOrder={updateOrder}
        isCreating={isCreating}
        isUpdating={isUpdating}
        createError={createError}
        updateError={updateError}
      />,
      {
        maxWidth: "xl",
      }
    );
  };

  const openEditOrderModal = (order: Order) => {
    openDialog(
      <OrderForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        createOrder={createOrder}
        updateOrder={updateOrder}
        isCreating={isCreating}
        isUpdating={isUpdating}
        createError={createError}
        updateError={updateError}
        defaultValues={order}
      />,
      {
        maxWidth: "xl",
      }
    );
  };

  const columns = getOrderColumns({
    onEdit: openEditOrderModal,
  });

  const toolbarActions = (
    <Button
      variant="default"
      size="sm"
      onClick={openCreateOrderModal}
      disabled={loading || isCreating}
    >
      {isCreating ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusCircle className="mr-2 h-4 w-4" />
      )}
      {isCreating ? "Creando..." : "Agregar Orden"}
    </Button>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error al cargar órdenes
          </h3>
          <p className="text-gray-600 mb-4">
            No se pudieron cargar los registros de órdenes. Intenta recargar la página.
          </p>
          <Button onClick={() => refreshOrders()} variant="outline">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Cargando órdenes...</p>
          </div>
        </div>
      ) : (
        <DataTable
          data={orders || []}
          columns={columns}
          toolbarProps={{
            actions: toolbarActions,
          }}
        />
      )}
    </>
  );
}

export default OrdersTable;