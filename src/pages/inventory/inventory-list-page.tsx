import InventoryTable from "@/components/features/inventory/inventories-table/inventories-table";

const InventoryListPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Inventario</h1>
      <InventoryTable />
    </div>
  );
};

export default InventoryListPage;
