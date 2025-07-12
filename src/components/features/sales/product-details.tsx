import type { SaleItem } from "@/api/types/response.types";
import { Package, Info } from "lucide-react";

const ProductDetails = ({ selectedItem }: { selectedItem: SaleItem | null }) => {
  if (!selectedItem) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-medium text-foreground">Detalles del producto</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
            <Package className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Selecciona un producto para ver sus detalles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">Detalles del producto</h3>
      </div>

      <div className="space-y-4">
        {/* Nombre y descripción */}
        <div>
          <h4 className="font-medium text-foreground">{selectedItem.product.name}</h4>
          <p className="text-sm text-muted-foreground mt-1">{selectedItem.product.description}</p>
        </div>

        {/* Información técnica */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground">SKU</span>
            <p className="font-medium text-foreground">{selectedItem.product.sku}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Unidad</span>
            <p className="font-medium text-foreground">{selectedItem.product.unit_of_measure}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Precio unitario</span>
            <p className="font-medium text-price">S/. {selectedItem.unit_price.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Cantidad</span>
            <p className="font-medium text-foreground">{selectedItem.quantity}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Lote</span>
            <p className="font-medium text-foreground">{selectedItem.product.batch_number}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Vencimiento</span>
            <p className="font-medium text-foreground">{selectedItem.product.expiration_date}</p>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-semibold text-price">
              S/. {selectedItem.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;