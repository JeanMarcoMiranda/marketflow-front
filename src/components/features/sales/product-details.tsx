import { SaleItem } from "@/api/types/response.types";
import { Package, Info } from "lucide-react";

const ProductDetails = ({ selectedItem }: { selectedItem: SaleItem | null }) => {
  if (!selectedItem) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-slate-600" />
          <h3 className="font-medium text-slate-900">Detalles del producto</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-slate-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <Package className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">
            Selecciona un producto para ver sus detalles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-slate-600" />
        <h3 className="font-medium text-slate-900">Detalles del producto</h3>
      </div>

      <div className="space-y-4">
        {/* Nombre y descripción */}
        <div>
          <h4 className="font-medium text-slate-900">{selectedItem.product.name}</h4>
          <p className="text-sm text-slate-600 mt-1">{selectedItem.product.description}</p>
        </div>

        {/* Información técnica */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-slate-500">SKU</span>
            <p className="font-medium text-slate-900">{selectedItem.product.sku}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500">Unidad</span>
            <p className="font-medium text-slate-900">{selectedItem.product.unit_of_measure}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500">Precio unitario</span>
            <p className="font-medium text-slate-900">S/. {selectedItem.unit_price.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500">Cantidad</span>
            <p className="font-medium text-slate-900">{selectedItem.quantity}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500">Lote</span>
            <p className="font-medium text-slate-900">{selectedItem.product.batch_number}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500">Vencimiento</span>
            <p className="font-medium text-slate-900">{selectedItem.product.expiration_date}</p>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Total</span>
            <span className="text-xl font-semibold text-slate-900">
              S/. {selectedItem.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;