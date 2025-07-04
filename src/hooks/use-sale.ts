import { SaleItem, Product, SaleSummary } from "@/api/types/response.types";
import { useState, useMemo } from "react";

export const useSale = () => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SaleItem | null>(null);

  const addItem = (product: Product, quantity: number = 1) => {
    const existingItem = saleItems.find(item => item.product.id === product.id);

    if (existingItem) {
      updateItemQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const newItem: SaleItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        unit_price: product.unit_price,
        total: product.unit_price * quantity
      };
      setSaleItems(prev => [...prev, newItem]);
      setSelectedItem(newItem);
    }
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setSaleItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: item.unit_price * newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItem(null);
  };

  const clearSale = () => {
    setSaleItems([]);
    setSelectedItem(null);
  };

  const summary: SaleSummary = useMemo(() => {
    const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.18; // 18% tax
    const discount = 0;
    const total = subtotal + tax - discount;

    return {
      subtotal,
      tax,
      discount,
      total,
      items_count: saleItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [saleItems]);

  return {
    saleItems,
    selectedItem,
    summary,
    addItem,
    updateItemQuantity,
    removeItem,
    clearSale,
    setSelectedItem
  };
};