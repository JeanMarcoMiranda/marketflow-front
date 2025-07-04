import { SaleItem } from "@/api/types/response.types";
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
    <div className="bg-white border border-slate-200 rounded-lg h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-slate-600" />
          <h2 className="font-medium text-slate-900">
            Productos ({items.length})
          </h2>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="p-4 space-y-2 max-h-full overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-slate-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">No hay productos agregados</p>
            <p className="text-slate-400 text-xs mt-1">
              Busca un producto para comenzar
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedItem?.id === item.id
                ? 'border-slate-900 bg-slate-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              onClick={() => onItemSelect(item)}
            >
              {/* Header del producto */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-slate-600 truncate">
                    {item.product.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
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
                  className="text-slate-400 hover:text-red-500 h-8 w-8 p-0"
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
                    className="h-8 w-8 p-0 border-slate-200"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <span className="w-12 text-center text-sm font-medium text-slate-900">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateQuantity(item.id, item.quantity + 1);
                    }}
                    className="h-8 w-8 p-0 border-slate-200"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Precios */}
                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    S/. {item.unit_price.toFixed(2)} c/u
                  </p>
                  <p className="font-medium text-slate-900">
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