// src/hooks/useOrders.ts
import type { CreateOrderPayload, Order, UpdateOrderPayload } from '@/api/types/orders.types';
import { mockOrders } from '@/lib/dummy-data/mock-orders';
import { useState, useEffect } from 'react';

const initialOrders = (() => {
  try {
    const stored = localStorage.getItem('ordersStore');
    return stored ? JSON.parse(stored) : [...mockOrders];
  } catch {
    return [...mockOrders];
  }
})();

let ordersStore: Order[] = initialOrders;

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders([...ordersStore]);
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
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders([...ordersStore]);
      setError(null);
    } catch {
      setError('Error al recargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (payload: CreateOrderPayload) => {
    setIsCreating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newOrder: Order = {
        ...payload,
        id: `order-${ordersStore.length + 1}`,
        updated_at: new Date().toISOString(),
        delivery_date: payload.delivery_date || undefined,
        notes: payload.notes || undefined,
      };
      ordersStore = [...ordersStore, newOrder];
      localStorage.setItem('ordersStore', JSON.stringify(ordersStore));
      setOrders([...ordersStore]);
      setCreateError(null);
      return newOrder;
    } catch {
      setCreateError('Error al crear la orden');
      throw new Error('Error al crear la orden');
    } finally {
      setIsCreating(false);
    }
  };

  const updateOrder = async (id: string, payload: UpdateOrderPayload) => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      ordersStore = ordersStore.map(order =>
        order.id === id
          ? {
            ...order,
            ...payload,
            updated_at: new Date().toISOString(),
            delivery_date: payload.delivery_date ?? order.delivery_date,
            notes: payload.notes ?? order.notes,
          }
          : order
      );
      localStorage.setItem('ordersStore', JSON.stringify(ordersStore));
      setOrders([...ordersStore]);
      setUpdateError(null);
    } catch {
      setUpdateError('Error al actualizar la orden');
      throw new Error('Error al actualizar la orden');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteOrder = async (id: string) => {
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      ordersStore = ordersStore.filter(order => order.id !== id);
      localStorage.setItem('ordersStore', JSON.stringify(ordersStore));
      setOrders([...ordersStore]);
      setDeleteError(null);
    } catch {
      setDeleteError('Error al eliminar la orden');
      throw new Error('Error al eliminar la orden');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    orders,
    loading,
    error,
    refreshOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError,
  };
};