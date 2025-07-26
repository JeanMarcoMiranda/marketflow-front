import type React from "react"

import type { Product } from "@/api/types/response.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProductSearch } from "@/hooks/use-product-search"
import { mockProducts } from "@/lib/dummy-data/mock-products"
import { Search, Scan, Package, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const ProductSearch = ({
  onProductSelect,
  onBarcodeScan,
}: {
  onProductSelect: (product: Product) => void
  onBarcodeScan: () => void
}) => {
  const { searchTerm, setSearchTerm, suggestions, showSuggestions, setShowSuggestions } = useProductSearch(mockProducts)

  const handleProductSelect = (product: Product) => {
    onProductSelect(product)
    setSearchTerm("")
    setShowSuggestions(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const getProductBadge = (product: Product) => {
    if (product.unit_price > 50) {
      return { text: "Premium", className: "bg-accent/10 text-accent border-accent/30" }
    }
    if (product.unit_price < 5) {
      return { text: "Económico", className: "bg-success/10 text-success border-success/30" }
    }
    return { text: "Popular", className: "bg-info/10 text-info border-info/30" }
  }

  return (
    <div className="relative">
      <div className="flex gap-3">
        {/* Input de búsqueda mejorado */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos por nombre, SKU o código de barras..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={cn(
              "w-full pl-10 pr-4 py-3 bg-background border border-border/60 rounded-xl text-sm",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md",
              searchTerm && "border-primary/40",
            )}
          />

          {/* Contador de resultados */}
          {searchTerm && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                {suggestions.length}
              </Badge>
            </div>
          )}

          {/* Sugerencias mejoradas */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-lg z-20 max-h-80 overflow-hidden">
              <div className="p-3 border-b border-border/50 bg-gradient-to-r from-card to-card/95">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Productos encontrados</span>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    {suggestions.length}
                  </Badge>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((product, index) => {
                  const badge = getProductBadge(product)
                  const isPopular = index < 3 // Primeros 3 como populares

                  return (
                    <div
                      key={product.id}
                      className="group p-4 hover:bg-muted/40 cursor-pointer border-b border-border/30 last:border-b-0 transition-all duration-200 hover:shadow-sm"
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <h4 className="font-semibold text-foreground truncate leading-tight group-hover:text-primary transition-colors">
                              {product.name}
                            </h4>
                            {isPopular && <TrendingUp className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-2 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-muted/60 px-2 py-1 rounded-md font-mono">
                              SKU: {product.sku}
                            </span>
                            <Badge variant="outline" className={badge.className}>
                              {badge.text}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="mb-1">
                            <span className="text-lg font-bold text-success">S/. {product.unit_price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Package className="w-3 h-3" />
                            <span>{product.unit_of_measure}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Botón de escáner mejorado */}
        <Button
          onClick={onBarcodeScan}
          variant="outline"
          className="px-4 py-3 h-12 border-border/60 hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md bg-transparent"
        >
          <Scan className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Escanear</span>
        </Button>
      </div>

      {/* Mensaje de ayuda */}
      {searchTerm && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border border-border/60 rounded-xl shadow-lg">
          <div className="text-center">
            <Package className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No se encontraron productos para "{searchTerm}"</p>
            <p className="text-xs text-muted-foreground mt-1">Intenta con otro término de búsqueda</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductSearch
