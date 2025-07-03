import ProductsTable from "@/components/features/inventory/profucts-table/products-table";

const ProductListPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <ProductsTable />
    </div>
  );
};

export default ProductListPage;
