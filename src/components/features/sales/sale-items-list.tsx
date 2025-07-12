import type { SaleItem } from "@/api/types/response.types";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const SaleItemsList = ({ items, selectedItem, onItemSelect, onUpdateQuantity, onRemoveItem }: {
  items: SaleItem[];
  selectedItem: SaleItem | null;
  onItemSelect: (item: SaleItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}) => {
  return (
    <div className="bg-card border border-border rounded-lg h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h2 className="font-medium text-foreground">
            Productos ({items.length})
          </h2>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="p-4 space-y-2 max-h-full overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No hay productos agregados</p>
            <p className="text-muted-foreground text-xs mt-1">
              Busca un producto para comenzar
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedItem?.id === item.id
                ? 'border-primary bg-muted'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              onClick={() => onItemSelect(item)}
            >
              {/* Header del producto */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.product.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    SKU: {item.product.sku}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item.id);
                  }}
                  className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Controles de cantidad y precio */}
              <div className="flex justify-between items-center">
                {/* Controles de cantidad */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateQuantity(item.id, item.quantity - 1);
                    }}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <span className="w-12 text-center text-sm font-medium text-foreground">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateQuantity(item.id, item.quantity + 1);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Precios */}
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    S/. {item.unit_price.toFixed(2)} c/u
                  </p>
                  <p className="font-medium text-price">
                    S/. {item.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SaleItemsList;
