import { SaleItem, SaleSummary } from "@/api/types/response.types";
import { X } from "lucide-react";

const VoucherPreview = ({ items, summary, onClose }: {
  items: SaleItem[];
  summary: SaleSummary;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Comprobante de Venta</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Mi Tienda</h3>
            <p className="text-sm text-gray-600">Av. Principal 123</p>
            <p className="text-sm text-gray-600">Tel: (01) 123-4567</p>
            <p className="text-sm text-gray-600">Fecha: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-600">{item.quantity} x ${item.unit_price.toFixed(2)}</p>
                  </div>
                  <span className="font-medium">${item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos:</span>
              <span>${summary.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>¡Gracias por su compra!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPreview;