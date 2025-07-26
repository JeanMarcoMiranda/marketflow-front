import type { SaleItem } from "@/api/types/response.types"
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const SaleItemsList = ({
  items,
  selectedItem,
  onItemSelect,
  onUpdateQuantity,
  onRemoveItem,
}: {
  items: SaleItem[]
  selectedItem: SaleItem | null
  onItemSelect: (item: SaleItem) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-card border border-border/60 rounded-xl shadow-sm h-full overflow-hidden">
      {/* Header mejorado */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-card to-card/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
              <ShoppingCart className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Carrito de Compras</h2>
              <p className="text-xs text-muted-foreground">
                {items.length} productos • {totalItems} unidades
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              {items.length}
            </Badge>
          )}
        </div>
      </div>

      {/* Lista de productos */}
      <div className="p-4 space-y-3 max-h-full overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/60 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
              <ShoppingCart className="w-8 h-8 text-muted-foreground/60" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Carrito vacío</h3>
            <p className="text-muted-foreground text-sm mb-1">No hay productos agregados</p>
            <p className="text-muted-foreground text-xs">Busca un producto para comenzar tu venta</p>
          </div>
        ) : (
          items.map((item, index) => {
            const isSelected = selectedItem?.id === item.id
            const isLowStock = item.quantity >= 10 // Simulamos stock bajo

            return (
              <div
                key={item.id}
                className={cn(
                  "group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                    : "border-border/60 hover:border-primary/40 hover:bg-muted/30 active:scale-[0.99]",
                )}
                onClick={() => onItemSelect(item)}
              >
                {/* Indicador de selección */}
                {isSelected && <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-full" />}

                {/* Header del producto */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0 pl-2">
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate leading-tight">{item.product.name}</h3>
                      {isLowStock && (
                        <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/30">
                          Stock bajo
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">{item.product.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="bg-muted/60 px-2 py-1 rounded-md font-mono">SKU: {item.product.sku}</span>
                      <span>#{index + 1}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveItem(item.id)
                    }}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Controles de cantidad y precio */}
                <div className="flex justify-between items-center pl-2">
                  {/* Controles de cantidad mejorados */}
                  <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }}
                      disabled={item.quantity <= 1}
                      className="h-7 w-7 p-0 hover:bg-background disabled:opacity-50"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <div className="w-12 text-center">
                      <span className="text-sm font-semibold text-foreground">{item.quantity}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }}
                      className="h-7 w-7 p-0 hover:bg-background"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Precios mejorados */}
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">S/. {item.unit_price.toFixed(2)} c/u</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-price">S/. {item.total.toFixed(2)}</span>
                      {item.quantity > 1 && (
                        <Badge variant="secondary" className="text-xs bg-info/10 text-info border-info/20">
                          x{item.quantity}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default SaleItemsList
