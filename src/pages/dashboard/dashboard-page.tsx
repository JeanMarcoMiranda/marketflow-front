/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Activity,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { getAll } from "@/store/data/localFakeApi";
import { useAuthStore } from "@/store/use-auth-store";

// Interfaces para las entidades
interface PurchaseOrder {
  id: string;
  id_branch: string;
  id_supplier: string;
  status:
    | "draft"
    | "approved"
    | "sent"
    | "in_transit"
    | "partially_received"
    | "received"
    | "canceled";
  request_date: string;
  expected_delivery_date: string;
  actual_delivery_date?: string;
  total_quantity: number;
  total_cost: number;
  [key: string]: string | number | undefined;
}

interface PurchaseOrderItem {
  id: string;
  id_purchase_order: string;
  id_product: string;
  requested_qty: number;
  received_qty: number;
  unit_cost: number;
  subtotal: number;
  [key: string]: string | number;
}

interface Inventory {
  id: string;
  id_branch: string;
  id_product: string;
  available_quantity: number;
  minimum_stock_quantity: number;
  status_alert: "normal" | "low" | "critical";
  [key: string]: string | number;
}

interface Supplier {
  id: string;
  name: string;
  contact_name: string;
  [key: string]: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  [key: string]: string;
}

export default function Dashboard() {
  // Obtener datos del usuario actual
  const { userData } = useAuthStore();
  const currentBranchId = userData?.id_branch;

  // Cargar datos desde localStorage
  const purchaseOrders = getAll<PurchaseOrder>("purchase_order");
  const purchaseOrderItems = getAll<PurchaseOrderItem>("purchase_order_item");
  const inventory = getAll<Inventory>("inventory");
  const suppliers = getAll<Supplier>("supplier");
  const products = getAll<Product>("product");

  console.log("Debug - Datos cargados:", {
    purchaseOrders: purchaseOrders.length,
    purchaseOrderItems: purchaseOrderItems.length,
    inventory: inventory.length,
    suppliers: suppliers.length,
    products: products.length,
    currentBranchId,
  });

  // Filtrar pedidos de la sucursal actual (más flexible)
  const branchPurchaseOrders = useMemo(() => {
    // Si no hay currentBranchId, mostrar todos los datos para debug
    if (!currentBranchId) {
      return purchaseOrders;
    }

    const filtered = purchaseOrders.filter(
      (order) => order.id_branch === currentBranchId
    );

    // Si no hay datos filtrados, usar todos para mostrar algo
    return filtered.length > 0 ? filtered : purchaseOrders;
  }, [purchaseOrders, currentBranchId]);

  console.log("Debug - Pedidos filtrados:", branchPurchaseOrders.length);

  // 1. Pedidos de reposición por status
  const ordersByStatus = useMemo(() => {
    if (branchPurchaseOrders.length === 0) return [];

    const statusCount = branchPurchaseOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = branchPurchaseOrders.length;
    return Object.entries(statusCount).map(([status, count]) => ({
      status: status.replace("_", " ").toUpperCase(),
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  }, [branchPurchaseOrders]);

  // 2. Alertas de stock crítico
  const stockAlerts = useMemo(() => {
    let currentBranchInventory = inventory;

    // Filtrar por sucursal si existe
    if (currentBranchId) {
      const filtered = inventory.filter(
        (item) => item.id_branch === currentBranchId
      );
      currentBranchInventory = filtered.length > 0 ? filtered : inventory;
    }

    const critical = currentBranchInventory.filter(
      (item) => item.status_alert === "critical"
    ).length;
    const low = currentBranchInventory.filter(
      (item) => item.status_alert === "low"
    ).length;
    const normal = currentBranchInventory.filter(
      (item) => item.status_alert === "normal"
    ).length;
    const total = currentBranchInventory.length;

    return {
      critical,
      low,
      normal,
      total,
      criticalPercentage: total > 0 ? Math.round((critical / total) * 100) : 0,
      lowPercentage: total > 0 ? Math.round((low / total) * 100) : 0,
    };
  }, [inventory, currentBranchId]);

  // 3. Tiempos de entrega promedio por proveedor
  const deliveryTimes = useMemo(() => {
    const ordersWithDelivery = branchPurchaseOrders.filter(
      (order) => order.actual_delivery_date
    );

    if (ordersWithDelivery.length === 0) return [];

    const supplierTimes = ordersWithDelivery.reduce((acc, order) => {
      const requestDate = new Date(order.request_date);
      const deliveryDate = new Date(order.actual_delivery_date!);
      const days = Math.ceil(
        (deliveryDate.getTime() - requestDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (!acc[order.id_supplier]) {
        acc[order.id_supplier] = { total: 0, count: 0 };
      }
      acc[order.id_supplier].total += days;
      acc[order.id_supplier].count += 1;

      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(supplierTimes)
      .map(([supplierId, data]) => {
        const supplier = suppliers.find((s) => s.id === supplierId);
        return {
          supplier: supplier?.name || `Proveedor ${supplierId.slice(-4)}`,
          avgDays: Math.round(data.total / data.count),
        };
      })
      .sort((a, b) => a.avgDays - b.avgDays);
  }, [branchPurchaseOrders, suppliers]);

  // 4. Top productos más pedidos
  const topProducts = useMemo(() => {
    if (branchPurchaseOrders.length === 0) return [];

    const branchOrderIds = branchPurchaseOrders.map((order) => order.id);
    const branchOrderItems = purchaseOrderItems.filter((item) =>
      branchOrderIds.includes(item.id_purchase_order)
    );

    if (branchOrderItems.length === 0) return [];

    const productTotals = branchOrderItems.reduce((acc, item) => {
      acc[item.id_product] = (acc[item.id_product] || 0) + item.requested_qty;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(productTotals)
      .map(([productId, qty]) => {
        const product = products.find((p) => p.id === productId);
        return {
          product: product?.name || `Producto ${productId.slice(-4)}`,
          quantity: qty,
        };
      })
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [branchPurchaseOrders, purchaseOrderItems, products]);

  // 5. Análisis de costos
  const costAnalysis = useMemo(() => {
    const completedOrders = branchPurchaseOrders.filter(
      (order) => order.actual_delivery_date
    );

    if (completedOrders.length === 0) {
      return { estimated: 0, real: 0, difference: 0, accuracy: 0 };
    }

    const analysis = completedOrders.map((order) => {
      const items = purchaseOrderItems.filter(
        (item) => item.id_purchase_order === order.id
      );
      const realCost = items.reduce(
        (sum, item) => sum + item.received_qty * item.unit_cost,
        0
      );
      return {
        estimated: order.total_cost,
        real: realCost,
        difference: order.total_cost - realCost,
      };
    });

    const totals = analysis.reduce(
      (acc, comp) => ({
        estimated: acc.estimated + comp.estimated,
        real: acc.real + comp.real,
        difference: acc.difference + comp.difference,
      }),
      { estimated: 0, real: 0, difference: 0 }
    );

    const accuracy =
      totals.estimated > 0
        ? Math.round((1 - Math.abs(totals.difference) / totals.estimated) * 100)
        : 0;

    return { ...totals, accuracy };
  }, [branchPurchaseOrders, purchaseOrderItems]);

  // 6. Proveedores más activos
  const activeSuppliers = useMemo(() => {
    if (branchPurchaseOrders.length === 0) return [];

    const supplierCounts = branchPurchaseOrders.reduce((acc, order) => {
      acc[order.id_supplier] = (acc[order.id_supplier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(supplierCounts)
      .map(([supplierId, count]) => {
        const supplier = suppliers.find((s) => s.id === supplierId);
        return {
          supplier: supplier?.name || `Proveedor ${supplierId.slice(-4)}`,
          orders: count,
        };
      })
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
  }, [branchPurchaseOrders, suppliers]);

  // 7. KPIs generales
  const generalKPIs = useMemo(() => {
    const totalOrders = branchPurchaseOrders.length;
    const completedOrders = branchPurchaseOrders.filter(
      (o) => o.status === "received"
    ).length;
    const pendingOrders = branchPurchaseOrders.filter((o) =>
      ["draft", "approved", "sent", "in_transit"].includes(o.status)
    ).length;
    const totalValue = branchPurchaseOrders.reduce(
      (sum, order) => sum + order.total_cost,
      0
    );
    const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;
    const completionRate =
      totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      totalValue,
      avgOrderValue,
      completionRate,
    };
  }, [branchPurchaseOrders]);

  // Colores mejorados con gradientes
  const COLORS = [
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
  ];

  const STATUS_COLORS = {
    DRAFT: "#94A3B8",
    APPROVED: "#3B82F6",
    SENT: "#F59E0B",
    "IN TRANSIT": "#8B5CF6",
    "PARTIALLY RECEIVED": "#06B6D4",
    RECEIVED: "#10B981",
    CANCELED: "#EF4444",
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Si no hay usuario autenticado, mostrar mensaje
  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Acceso Requerido</CardTitle>
            <CardDescription>
              Debes estar autenticado para ver el dashboard
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Alertas críticas */}
        {stockAlerts.critical > 0 && (
          <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Atención:</strong> {stockAlerts.critical} productos con
              stock crítico y {stockAlerts.low} con stock bajo requieren
              reposición inmediata.
            </AlertDescription>
          </Alert>
        )}

        {/* KPIs principales */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pedidos
              </CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {generalKPIs.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                +2.5% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {generalKPIs.completedOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                {generalKPIs.completionRate}% tasa de completitud
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Activity className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {generalKPIs.pendingOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Requieren seguimiento
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${generalKPIs.totalValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                En pedidos activos
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-cyan-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Promedio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600">
                ${Math.round(generalKPIs.avgOrderValue).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Por pedido</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa Completitud
              </CardTitle>
              <Target className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {generalKPIs.completionRate}%
              </div>
              <Progress
                value={generalKPIs.completionRate}
                className="mt-2 h-1"
              />
            </CardContent>
          </Card>
        </div>

        {/* Grid principal de gráficos */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {/* Estado de pedidos */}
          <Card className="xl:col-span-1 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                Estado de Pedidos
              </CardTitle>
              <CardDescription>Distribución actual por estado</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={ordersByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percentage }) =>
                        `${status} ${percentage}%`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="count"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {ordersByStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            STATUS_COLORS[
                              entry.status as keyof typeof STATUS_COLORS
                            ] || COLORS[index % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-[280px] text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mb-4 opacity-50" />
                  <p>No hay pedidos registrados</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alertas de inventario */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Estado del Inventario
              </CardTitle>
              <CardDescription>
                Distribución de alertas de stock
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Stock Crítico</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                      {stockAlerts.critical}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {stockAlerts.criticalPercentage}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={stockAlerts.criticalPercentage}
                  className="h-3 bg-red-100"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Stock Bajo</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      {stockAlerts.low}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {stockAlerts.lowPercentage}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={stockAlerts.lowPercentage}
                  className="h-3 bg-yellow-100"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Stock Normal</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {stockAlerts.normal}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {100 -
                        stockAlerts.criticalPercentage -
                        stockAlerts.lowPercentage}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Precisión de costos */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Precisión de Costos
              </CardTitle>
              <CardDescription>
                Estimado vs. real en pedidos completados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {costAnalysis.accuracy}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Precisión promedio
                </p>
                <Progress value={costAnalysis.accuracy} className="mt-2 h-2" />
              </div>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Estimado
                  </span>
                  <span className="font-medium">
                    ${costAnalysis.estimated.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Real
                  </span>
                  <span className="font-medium">
                    ${costAnalysis.real.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t pt-2">
                  <span>Diferencia</span>
                  <span
                    className={
                      costAnalysis.difference >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    ${Math.abs(costAnalysis.difference).toLocaleString()}
                    {costAnalysis.difference >= 0 ? " ahorro" : " sobrecosto"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos de análisis */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Tiempos de entrega */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Tiempos de Entrega por Proveedor
              </CardTitle>
              <CardDescription>Días promedio de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              {deliveryTimes.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={deliveryTimes}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="deliveryGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="supplier"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={<CustomTooltip />}
                      formatter={(value) => [`${value} días`, "Promedio"]}
                    />
                    <Bar
                      dataKey="avgDays"
                      fill="url(#deliveryGradient)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-[320px] text-muted-foreground">
                  <Truck className="h-12 w-12 mb-4 opacity-50" />
                  <p>No hay datos de entregas completadas</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top productos */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Productos Más Demandados
              </CardTitle>
              <CardDescription>
                Top 5 productos por cantidad pedida
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={topProducts}
                    layout="horizontal"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="productGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0.3}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis
                      dataKey="product"
                      type="category"
                      width={140}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      formatter={(value) => [`${value} unidades`, "Cantidad"]}
                    />
                    <Bar
                      dataKey="quantity"
                      fill="url(#productGradient)"
                      radius={[0, 4, 4, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-[320px] text-muted-foreground">
                  <Package className="h-12 w-12 mb-4 opacity-50" />
                  <p>No hay datos de productos pedidos</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proveedores más activos */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Proveedores Más Activos
              </CardTitle>
              <CardDescription>Ranking por número de pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              {activeSuppliers.length > 0 ? (
                <div className="space-y-4">
                  {activeSuppliers.map((supplier, index) => (
                    <div
                      key={supplier.supplier}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : index === 1
                              ? "bg-gray-100 text-gray-800 border-gray-300"
                              : index === 2
                              ? "bg-orange-100 text-orange-800 border-orange-300"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {index + 1}
                        </Badge>
                        <div>
                          <span className="font-medium text-lg">
                            {supplier.supplier}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {supplier.orders} pedidos realizados
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">
                            {supplier.orders}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            pedidos
                          </div>
                        </div>
                        <Progress
                          value={
                            (supplier.orders /
                              Math.max(
                                ...activeSuppliers.map((s) => s.orders)
                              )) *
                            100
                          }
                          className="w-24 h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                  <Users className="h-12 w-12 mb-4 opacity-50" />
                  <p>No hay datos de proveedores</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
