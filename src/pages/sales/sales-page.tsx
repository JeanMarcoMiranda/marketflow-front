import { Product } from "@/api/types/response.types";
import ProductDetails from "@/components/features/sales/product-details";
import ProductSearch from "@/components/features/sales/product-search";
import SaleItemsList from "@/components/features/sales/sale-items-list";
import SaleSummary from "@/components/features/sales/sale-summary";
import VoucherPreview from "@/components/features/sales/voucher-preview";
import { useSale } from "@/hooks/use-sale";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Receipt,
  Package,
  X,
  CheckCircle
} from "lucide-react";

const SalesPage = () => {
  const {
    saleItems,
    selectedItem,
    summary,
    addItem,
    updateItemQuantity,
    removeItem,
    clearSale,
    setSelectedItem
  } = useSale();

  const [showVoucher, setShowVoucher] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleProductSelect = (product: Product) => {
    addItem(product);
  };

  const handleBarcodeScan = () => {
    // Simulate barcode scan - in real app this would use camera API
    alert('Función de escaneo de código de barras - implementar con cámara');
  };

  const handleCompleteSale = async () => {
    if (saleItems.length > 0) {
      setIsCompleting(true);
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsCompleting(false);
      setShowVoucher(true);
    }
  };

  const handleCloseVoucher = () => {
    setShowVoucher(false);
    clearSale();
  };

  return (
    <div className="min-h-fit bg-slate-50">
      {/* Header minimalista */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Punto de Venta
                </h1>
                <p className="text-sm text-slate-600">
                  Sistema de ventas
                </p>
              </div>
            </div>

            {/* Stats minimalistas */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span>{saleItems.length} productos</span>
              </div>
              <div className="text-sm font-medium text-slate-900">
                S/. {summary.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Búsqueda */}
        <div className="mb-6">
          <ProductSearch
            onProductSelect={handleProductSelect}
            onBarcodeScan={handleBarcodeScan}
          />
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <SaleItemsList
              items={saleItems}
              selectedItem={selectedItem}
              onItemSelect={setSelectedItem}
              onUpdateQuantity={updateItemQuantity}
              onRemoveItem={removeItem}
            />
          </div>

          {/* Sidebar derecho */}
          <div className="space-y-6">
            {/* Detalles del producto */}
            <ProductDetails selectedItem={selectedItem} />

            {/* Resumen */}
            <div className="sticky top-24">
              <SaleSummary
                summary={summary}
                onCompleteSale={handleCompleteSale}
                onClearSale={clearSale}
                isCompleting={isCompleting}
              />
            </div>
          </div>
        </div>

        {/* Modal del voucher */}
        {showVoucher && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              {/* Header del modal */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Venta Completada
                    </h2>
                    <p className="text-sm text-slate-600">
                      Comprobante generado
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseVoucher}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Contenido del voucher */}
              <div className="p-4">
                <VoucherPreview
                  items={saleItems}
                  summary={summary}
                  onClose={handleCloseVoucher}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;