// src/hooks/useOrders.ts
import { Order } from '@/api/types/orders.types';
import { mockOrders } from '@/lib/dummy-data/mock-orders';
import { useState, useEffect } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular llamada API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // En una app real, esto sería una llamada a la API
        // const response = await fetch('/api/orders');
        // const data = await response.json();

        setOrders(mockOrders);
        setError(null);
      } catch (err) {
        setError('Error al cargar las órdenes');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const refreshOrders = async () => {
    setLoading(true);
    try {
      // Simular recarga de datos
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders([...mockOrders]);
      setError(null);
    } catch (err) {
      setError('Error al recargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    refreshOrders
  };
};