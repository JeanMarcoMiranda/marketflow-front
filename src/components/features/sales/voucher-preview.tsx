import type { SaleItem, SaleSummary } from "@/api/types/response.types";
import { X } from "lucide-react";

const VoucherPreview = ({ items, summary, onClose }: {
  items: SaleItem[];
  summary: SaleSummary;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Comprobante de Venta</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary">Mi Minimarket</h3>
            <p className="text-sm text-muted-foreground">Av. Principal 123</p>
            <p className="text-sm text-muted-foreground">Tel: (01) 123-4567</p>
            <p className="text-sm text-muted-foreground">Fecha: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="border-t border-b border-border py-4 mb-4">
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.product.name}</p>
                    <p className="text-muted-foreground">{item.quantity} x S/. {item.unit_price.toFixed(2)}</p>
                  </div>
                  <span className="font-medium text-price">S/. {item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="text-foreground">S/. {summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Impuestos:</span>
              <span className="text-foreground">S/. {summary.tax.toFixed(2)}</span>
            </div>
            {summary.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Descuentos:</span>
                <span className="text-discount">-S/. {summary.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
              <span className="text-foreground">Total:</span>
              <span className="text-price">S/. {summary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>¡Gracias por su compra!</p>
            <p className="mt-1 text-xs">Vuelve pronto a nuestro minimarket</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPreview;