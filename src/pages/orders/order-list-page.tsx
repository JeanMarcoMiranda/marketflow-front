import OrdersTable from "@/components/features/orders/orders-table/orders-table";

const OrdersListPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
      <OrdersTable />
    </div>
  );
};

export default OrdersListPage;