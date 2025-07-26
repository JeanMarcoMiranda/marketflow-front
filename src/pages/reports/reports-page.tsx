"use client";

import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Mail,
  Clock,
  Target,
  AlertTriangle,
  Activity,
  CreditCard,
  Percent,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
  Tooltip,
} from "recharts";

type DateRange = "today" | "week" | "month";
type Employee = "maria" | "carlos" | "ana" | "luis" | "all";
type Category =
  | "bebidas"
  | "snacks"
  | "lacteos"
  | "limpieza"
  | "panaderia"
  | "all";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("today");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>("all");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced base data with more comprehensive information
  const baseData = {
    today: {
      sales: [
        {
          date: "Lun",
          sales: 2400,
          transactions: 120,
          profit: 960,
          returns: 24,
        },
        {
          date: "Mar",
          sales: 1398,
          transactions: 89,
          profit: 559,
          returns: 14,
        },
        {
          date: "Mié",
          sales: 2800,
          transactions: 134,
          profit: 1120,
          returns: 28,
        },
        {
          date: "Jue",
          sales: 3908,
          transactions: 156,
          profit: 1563,
          returns: 39,
        },
        {
          date: "Vie",
          sales: 4800,
          transactions: 198,
          profit: 1920,
          returns: 48,
        },
        {
          date: "Sáb",
          sales: 3800,
          transactions: 167,
          profit: 1520,
          returns: 38,
        },
        {
          date: "Dom",
          sales: 4300,
          transactions: 189,
          profit: 1720,
          returns: 43,
        },
      ],
      kpi: {
        todaySales: 2847.5,
        todayTransactions: 156,
        averageTicket: 18.25,
        totalProfit: 1139,
        profitMargin: 40,
        customerCount: 142,
        returnRate: 2.1,
        conversionRate: 91.5,
      },
    },
    week: {
      sales: [
        {
          date: "Sem 1",
          sales: 18400,
          transactions: 920,
          profit: 7360,
          returns: 184,
        },
        {
          date: "Sem 2",
          sales: 21398,
          transactions: 1089,
          profit: 8559,
          returns: 214,
        },
        {
          date: "Sem 3",
          sales: 19800,
          transactions: 934,
          profit: 7920,
          returns: 198,
        },
        {
          date: "Sem 4",
          sales: 23908,
          transactions: 1156,
          profit: 9563,
          returns: 239,
        },
      ],
      kpi: {
        todaySales: 23908,
        todayTransactions: 1156,
        averageTicket: 20.68,
        totalProfit: 9563,
        profitMargin: 40,
        customerCount: 1050,
        returnRate: 2.1,
        conversionRate: 91.0,
      },
    },
    month: {
      sales: [
        {
          date: "Ene",
          sales: 84400,
          transactions: 4120,
          profit: 33760,
          returns: 844,
        },
        {
          date: "Feb",
          sales: 91398,
          transactions: 4589,
          profit: 36559,
          returns: 914,
        },
        {
          date: "Mar",
          sales: 89800,
          transactions: 4234,
          profit: 35920,
          returns: 898,
        },
        {
          date: "Abr",
          sales: 103908,
          transactions: 5156,
          profit: 41563,
          returns: 1039,
        },
        {
          date: "May",
          sales: 98800,
          transactions: 4898,
          profit: 39520,
          returns: 988,
        },
        {
          date: "Jun",
          sales: 113800,
          transactions: 5567,
          profit: 45520,
          returns: 1138,
        },
      ],
      kpi: {
        todaySales: 113800,
        todayTransactions: 5567,
        averageTicket: 20.44,
        totalProfit: 45520,
        profitMargin: 40,
        customerCount: 5100,
        returnRate: 2.0,
        conversionRate: 92.2,
      },
    },
  };

  // Enhanced filtered data with employee and category multipliers
  const filteredData = useMemo(() => {
    const currentData = baseData[dateRange] || baseData.today;
    let salesData = [...currentData.sales];
    let kpiData = { ...currentData.kpi };

    // Apply employee filters with realistic multipliers
    if (selectedEmployee !== "all") {
      const employeeMultipliers = {
        maria: { sales: 1.2, efficiency: 1.15 },
        carlos: { sales: 0.8, efficiency: 0.95 },
        ana: { sales: 0.9, efficiency: 1.05 },
        luis: { sales: 0.7, efficiency: 0.85 },
      };

      const multiplier = employeeMultipliers[selectedEmployee] || {
        sales: 1,
        efficiency: 1,
      };

      salesData = salesData.map((item) => ({
        ...item,
        sales: Math.round(item.sales * multiplier.sales),
        transactions: Math.round(item.transactions * multiplier.sales),
        profit: Math.round(item.profit * multiplier.sales),
        returns: Math.round(item.returns * multiplier.sales),
      }));

      kpiData = {
        todaySales: Math.round(kpiData.todaySales * multiplier.sales),
        todayTransactions: Math.round(
          kpiData.todayTransactions * multiplier.sales
        ),
        averageTicket:
          Math.round(kpiData.averageTicket * multiplier.efficiency * 100) / 100,
        totalProfit: Math.round(kpiData.totalProfit * multiplier.sales),
        profitMargin:
          Math.round(kpiData.profitMargin * multiplier.efficiency * 100) / 100,
        customerCount: Math.round(kpiData.customerCount * multiplier.sales),
        returnRate:
          Math.round((kpiData.returnRate / multiplier.efficiency) * 100) / 100,
        conversionRate:
          Math.round(kpiData.conversionRate * multiplier.efficiency * 100) /
          100,
      };
    }

    // Apply category filters
    if (selectedCategory !== "all") {
      const categoryMultipliers = {
        bebidas: 1.3,
        snacks: 0.7,
        lacteos: 0.85,
        limpieza: 0.6,
        panaderia: 0.9,
      };

      const categoryMultiplier = categoryMultipliers[selectedCategory] || 1;

      salesData = salesData.map((item) => ({
        ...item,
        sales: Math.round(item.sales * categoryMultiplier),
        transactions: Math.round(item.transactions * categoryMultiplier),
        profit: Math.round(item.profit * categoryMultiplier),
        returns: Math.round(item.returns * categoryMultiplier),
      }));

      kpiData = {
        todaySales: Math.round(kpiData.todaySales * categoryMultiplier),
        todayTransactions: Math.round(
          kpiData.todayTransactions * categoryMultiplier
        ),
        averageTicket:
          Math.round(kpiData.averageTicket * categoryMultiplier * 100) / 100,
        totalProfit: Math.round(kpiData.totalProfit * categoryMultiplier),
        profitMargin: kpiData.profitMargin, // Margin stays relatively stable
        customerCount: Math.round(kpiData.customerCount * categoryMultiplier),
        returnRate: kpiData.returnRate,
        conversionRate: kpiData.conversionRate,
      };
    }

    return { salesData, kpiData };
  }, [dateRange, selectedEmployee, selectedCategory]);

  // Enhanced product sales data with proper structure for pie chart
  const productSalesData = useMemo(() => {
    const baseProducts = [
      { name: "Bebidas", value: 35, sales: 8500 },
      { name: "Snacks", value: 25, sales: 6200 },
      { name: "Lácteos", value: 20, sales: 4800 },
      { name: "Limpieza", value: 12, sales: 2900 },
      { name: "Panadería", value: 8, sales: 1900 },
    ];

    if (selectedCategory !== "all") {
      return baseProducts.map((product) => ({
        ...product,
        value:
          product.name.toLowerCase() === selectedCategory
            ? 60
            : product.value * 0.6,
        sales:
          product.name.toLowerCase() === selectedCategory
            ? product.sales * 1.5
            : product.sales * 0.7,
      }));
    }

    return baseProducts;
  }, [selectedCategory]);

  const paymentMethodsData = [
    { method: "Efectivo", amount: 12500, percentage: 45, transactions: 567 },
    {
      method: "Tarjeta Débito",
      amount: 8900,
      percentage: 32,
      transactions: 234,
    },
    {
      method: "Tarjeta Crédito",
      amount: 5200,
      percentage: 19,
      transactions: 156,
    },
    { method: "Transferencia", amount: 1100, percentage: 4, transactions: 43 },
  ];

  const topProductsData = [
    {
      product: "Coca Cola 500ml",
      quantity: 45,
      revenue: 675,
      margin: 35,
      category: "Bebidas",
    },
    {
      product: "Pan Integral",
      quantity: 38,
      revenue: 190,
      margin: 40,
      category: "Panadería",
    },
    {
      product: "Leche Entera 1L",
      quantity: 32,
      revenue: 128,
      margin: 25,
      category: "Lácteos",
    },
    {
      product: "Agua 600ml",
      quantity: 29,
      revenue: 87,
      margin: 45,
      category: "Bebidas",
    },
    {
      product: "Galletas Oreo",
      quantity: 25,
      revenue: 125,
      margin: 38,
      category: "Snacks",
    },
  ];

  const lowStockData = [
    {
      product: "Detergente Ariel",
      current: 3,
      minimum: 10,
      status: "critical",
      value: 450,
      category: "Limpieza",
    },
    {
      product: "Aceite Girasol",
      current: 7,
      minimum: 15,
      status: "warning",
      value: 280,
      category: "Despensa",
    },
    {
      product: "Arroz 1kg",
      current: 12,
      minimum: 20,
      status: "warning",
      value: 180,
      category: "Despensa",
    },
    {
      product: "Papel Higiénico",
      current: 2,
      minimum: 8,
      status: "critical",
      value: 120,
      category: "Limpieza",
    },
  ];

  // const employeePerformanceData = [
  //   {
  //     name: "María González",
  //     sales: 15600,
  //     transactions: 89,
  //     avgTicket: 17.5,
  //     efficiency: 95,
  //     hours: 40,
  //     commission: 234,
  //   },
  //   {
  //     name: "Carlos Ruiz",
  //     sales: 12400,
  //     transactions: 76,
  //     avgTicket: 16.3,
  //     efficiency: 87,
  //     hours: 38,
  //     commission: 186,
  //   },
  //   {
  //     name: "Ana López",
  //     sales: 9800,
  //     transactions: 62,
  //     avgTicket: 15.8,
  //     efficiency: 92,
  //     hours: 35,
  //     commission: 147,
  //   },
  //   {
  //     name: "Luis Martín",
  //     sales: 8200,
  //     transactions: 54,
  //     avgTicket: 15.2,
  //     efficiency: 78,
  //     hours: 32,
  //     commission: 123,
  //   },
  // ];

  const hourlyData = [
    { hour: "08:00", sales: 450, customers: 23, avgTicket: 19.6 },
    { hour: "09:00", sales: 680, customers: 34, avgTicket: 20.0 },
    { hour: "10:00", sales: 920, customers: 45, avgTicket: 20.4 },
    { hour: "11:00", sales: 1200, customers: 58, avgTicket: 20.7 },
    { hour: "12:00", sales: 1850, customers: 89, avgTicket: 20.8 },
    { hour: "13:00", sales: 2100, customers: 98, avgTicket: 21.4 },
    { hour: "14:00", sales: 1950, customers: 87, avgTicket: 22.4 },
    { hour: "15:00", sales: 1600, customers: 72, avgTicket: 22.2 },
    { hour: "16:00", sales: 1400, customers: 65, avgTicket: 21.5 },
    { hour: "17:00", sales: 1750, customers: 78, avgTicket: 22.4 },
    { hour: "18:00", sales: 2200, customers: 95, avgTicket: 23.2 },
    { hour: "19:00", sales: 1900, customers: 82, avgTicket: 23.2 },
    { hour: "20:00", sales: 1200, customers: 54, avgTicket: 22.2 },
    { hour: "21:00", sales: 800, customers: 38, avgTicket: 21.1 },
  ];

  const cashFlowData = [
    { date: "01/01", income: 2400, expenses: 1800, profit: 600 },
    { date: "02/01", income: 1398, expenses: 1200, profit: 198 },
    { date: "03/01", income: 2800, expenses: 1800, profit: 1000 },
    { date: "04/01", income: 3908, expenses: 2200, profit: 1708 },
    { date: "05/01", income: 4800, expenses: 2600, profit: 2200 },
    { date: "06/01", income: 3800, expenses: 2100, profit: 1700 },
    { date: "07/01", income: 4300, expenses: 2400, profit: 1900 },
  ];

  const inventoryMovements = [
    {
      product: "Coca Cola 500ml",
      type: "Salida",
      quantity: -45,
      date: "2024-01-07 14:30",
      value: 675,
    },
    {
      product: "Detergente Ariel",
      type: "Entrada",
      quantity: +50,
      date: "2024-01-07 10:15",
      value: 750,
    },
    {
      product: "Pan Integral",
      type: "Salida",
      quantity: -38,
      date: "2024-01-07 09:45",
      value: 190,
    },
    {
      product: "Leche Entera 1L",
      type: "Entrada",
      quantity: +100,
      date: "2024-01-06 16:20",
      value: 400,
    },
    {
      product: "Arroz 1kg",
      type: "Salida",
      quantity: -25,
      date: "2024-01-06 15:30",
      value: 375,
    },
    {
      product: "Aceite Girasol",
      type: "Entrada",
      quantity: +30,
      date: "2024-01-06 11:45",
      value: 420,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const handleExport = (format: string, reportType: string) => {
    setIsLoading(true);

    setTimeout(() => {
      if (format === "pdf") {
        const pdfContent = `
REPORTE: ${reportType.toUpperCase()}
========================================
Período: ${dateRange}
Empleado: ${selectedEmployee}
Categoría: ${selectedCategory}
Fecha de generación: ${new Date().toLocaleString()}

MÉTRICAS PRINCIPALES:
- Ventas Totales: $${filteredData.kpiData.todaySales.toLocaleString()}
- Transacciones: ${filteredData.kpiData.todayTransactions}
- Ticket Promedio: $${filteredData.kpiData.averageTicket}
- Ganancia Total: $${filteredData.kpiData.totalProfit.toLocaleString()}
- Margen de Ganancia: ${filteredData.kpiData.profitMargin}%

DATOS DE VENTAS:
${filteredData.salesData
  .map(
    (item) =>
      `${item.date}: $${item.sales} (${item.transactions} transacciones)`
  )
  .join("\n")}
        `;

        const blob = new Blob([pdfContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${reportType.replace(/\s+/g, "_")}_${dateRange}_${
          new Date().toISOString().split("T")[0]
        }.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else if (format === "excel") {
        const csvContent = [
          `Reporte,${reportType}`,
          `Período,${dateRange}`,
          `Empleado,${selectedEmployee}`,
          `Categoría,${selectedCategory}`,
          `Fecha de generación,${new Date().toLocaleString()}`,
          "",
          "MÉTRICAS PRINCIPALES",
          `Ventas Totales,$${filteredData.kpiData.todaySales}`,
          `Transacciones,${filteredData.kpiData.todayTransactions}`,
          `Ticket Promedio,$${filteredData.kpiData.averageTicket}`,
          `Ganancia Total,$${filteredData.kpiData.totalProfit}`,
          `Margen de Ganancia,${filteredData.kpiData.profitMargin}%`,
          "",
          "DATOS DE VENTAS",
          "Fecha,Ventas,Transacciones,Ganancia,Devoluciones",
          ...filteredData.salesData.map(
            (row) =>
              `${row.date},${row.sales},${row.transactions},${row.profit},${row.returns}`
          ),
        ].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${reportType.replace(/\s+/g, "_")}_${dateRange}_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      setIsLoading(false);
      toast.success("Reporte exportado", {
        description: `El reporte de ${reportType} se ha exportado en formato ${format.toUpperCase()}.`,
      });
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Datos actualizados", {
        description:
          "Los reportes se han actualizado con la información más reciente.",
      });
    }, 1500);
  };

  const handleScheduleReport = () => {
    toast.success("Reporte programado", {
      description:
        "El reporte se enviará automáticamente según la configuración establecida.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
                Centro de Reportes
              </h1>
              <p className="text-gray-600 mt-2">
                Análisis completo del rendimiento de tu minimarket
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Actualizar
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("pdf", "reporte_general")}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("excel", "reporte_general")}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Programar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Programar Reporte Automático</DialogTitle>
                    <DialogDescription>
                      Configura el envío automático de reportes por email
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Tipo de Reporte</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar reporte" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Reporte Diario</SelectItem>
                          <SelectItem value="weekly">
                            Reporte Semanal
                          </SelectItem>
                          <SelectItem value="monthly">
                            Reporte Mensual
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Frecuencia</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Email de Destino</Label>
                      <Input placeholder="admin@minimarket.com" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button onClick={handleScheduleReport}>Programar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select
                value={dateRange}
                onValueChange={(value) => setDateRange(value as DateRange)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <Select
                value={selectedEmployee}
                onValueChange={(value) =>
                  setSelectedEmployee(value as Employee)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Empleados</SelectItem>
                  <SelectItem value="maria">María González</SelectItem>
                  <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                  <SelectItem value="ana">Ana López</SelectItem>
                  <SelectItem value="luis">Luis Martín</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-gray-500" />
              <Select
                value={selectedCategory}
                onValueChange={(value) =>
                  setSelectedCategory(value as Category)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Categorías</SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                  <SelectItem value="lacteos">Lácteos</SelectItem>
                  <SelectItem value="limpieza">Limpieza</SelectItem>
                  <SelectItem value="panaderia">Panadería</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Más Filtros
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ventas del Período
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${filteredData.kpiData.todaySales.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">12.5%</span>
                <span className="ml-1">vs anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transacciones
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.kpiData.todayTransactions}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">3.2%</span>
                <span className="ml-1">vs anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ticket Promedio
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${filteredData.kpiData.averageTicket}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">8.7%</span>
                <span className="ml-1">vs anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ganancia Total
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${filteredData.kpiData.totalProfit.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">15.2%</span>
                <span className="ml-1">vs anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Margen de Ganancia
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.kpiData.profitMargin}%
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">2.1%</span>
                <span className="ml-1">vs anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Conversión
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.kpiData.conversionRate}%
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500">1.8%</span>
                <span className="ml-1">vs anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Reports Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
            <TabsTrigger value="financial">Financiero</TabsTrigger>
            {/* <TabsTrigger value="employees">Empleados</TabsTrigger> */}
            <TabsTrigger value="analytics">Análisis</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas del Período</CardTitle>
                  <CardDescription>
                    Comparativa de ventas y transacciones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={filteredData.salesData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "sales"
                              ? `$${value.toLocaleString()}`
                              : value,
                            name === "sales" ? "Ventas" : "Transacciones",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stackId="1"
                          stroke="#0088FE"
                          fill="#0088FE"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Categoría</CardTitle>
                  <CardDescription>
                    Distribución de ventas por tipo de producto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productSalesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productSalesData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Porcentaje"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Productos Más Vendidos</CardTitle>
                  <CardDescription>
                    Top 5 productos por cantidad vendida
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProductsData.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{product.product}</p>
                            <p className="text-sm text-gray-500">
                              {product.quantity} unidades • {product.margin}%
                              margen
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${product.revenue}</p>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Alertas de Stock
                  </CardTitle>
                  <CardDescription>
                    Productos con stock bajo que requieren atención
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{item.product}</p>
                          <p className="text-sm text-gray-500">
                            Stock: {item.current} / Mínimo: {item.minimum} •
                            Valor: ${item.value}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              item.status === "critical"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {item.status === "critical"
                              ? "Crítico"
                              : "Advertencia"}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Ventas por Hora</CardTitle>
                  <CardDescription>
                    Análisis de horarios pico de ventas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={hourlyData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "sales"
                              ? `$${value.toLocaleString()}`
                              : value,
                            name === "sales"
                              ? "Ventas"
                              : name === "customers"
                              ? "Clientes"
                              : "Ticket Promedio",
                          ]}
                        />
                        <Bar dataKey="sales" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                  <CardDescription>
                    Distribución por tipo de pago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethodsData.map((method, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {method.method}
                          </span>
                          <span className="text-sm text-gray-500">
                            {method.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${method.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold">
                            ${method.amount.toLocaleString()}
                          </span>
                          <span className="text-gray-500">
                            {method.transactions} transacciones
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Resumen de Ventas Detallado</CardTitle>
                  <CardDescription>
                    Análisis completo del período seleccionado
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport("pdf", "resumen de ventas")}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport("excel", "resumen de ventas")}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      $
                      {filteredData.salesData
                        .reduce((sum, item) => sum + item.sales, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Ventas Totales</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {filteredData.salesData
                        .reduce((sum, item) => sum + item.transactions, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Transacciones</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ${filteredData.kpiData.averageTicket}
                    </div>
                    <div className="text-sm text-gray-600">Ticket Promedio</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      $
                      {filteredData.salesData
                        .reduce((sum, item) => sum + item.profit, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Ganancia Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estado del Inventario</CardTitle>
                  <CardDescription>
                    Resumen general del stock actual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        1,245
                      </div>
                      <div className="text-sm text-gray-600">
                        Productos en Stock
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-xl font-bold text-red-600">23</div>
                      <div className="text-sm text-gray-600">Stock Bajo</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-xl font-bold text-yellow-600">8</div>
                      <div className="text-sm text-gray-600">Sin Stock</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">
                        $45,678
                      </div>
                      <div className="text-sm text-gray-600">Valor Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rotación de Inventario</CardTitle>
                  <CardDescription>
                    Productos con mayor y menor rotación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">
                        Mayor Rotación
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Coca Cola 500ml</span>
                          <Badge variant="default">15.2x</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pan Integral</span>
                          <Badge variant="default">12.8x</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Leche Entera 1L</span>
                          <Badge variant="default">10.5x</Badge>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">
                        Menor Rotación
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Detergente Premium</span>
                          <Badge variant="secondary">1.2x</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Aceite Oliva</span>
                          <Badge variant="secondary">0.8x</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Vino Tinto</span>
                          <Badge variant="secondary">0.5x</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Movimientos de Inventario</CardTitle>
                  <CardDescription>
                    Entradas y salidas de productos recientes
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleExport("pdf", "movimientos inventario")
                    }
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleExport("excel", "movimientos inventario")
                    }
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryMovements.map((movement, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            movement.type === "Entrada"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">{movement.product}</p>
                          <p className="text-sm text-gray-500">
                            {movement.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            movement.type === "Entrada"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {movement.type}
                        </Badge>
                        <p
                          className={`text-sm font-semibold ${
                            movement.quantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${movement.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos del Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${filteredData.kpiData.todaySales.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12.5% vs período anterior
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {filteredData.kpiData.todayTransactions} transacciones
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gastos del Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {Math.round(
                      filteredData.kpiData.todaySales * 0.62
                    ).toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-red-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8.2% vs período anterior
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    62% de los ingresos
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ganancia Neta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${filteredData.kpiData.totalProfit.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +18.7% vs período anterior
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {filteredData.kpiData.profitMargin}% margen
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Flujo de Caja</CardTitle>
                  <CardDescription>Ingresos vs gastos por día</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport("pdf", "flujo de caja")}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport("excel", "flujo de caja")}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cashFlowData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          `$${value.toLocaleString()}`,
                          name === "income"
                            ? "Ingresos"
                            : name === "expenses"
                            ? "Gastos"
                            : "Ganancia",
                        ]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#0088FE"
                        strokeWidth={2}
                        name="Ingresos"
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#FF8042"
                        strokeWidth={2}
                        name="Gastos"
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#00C49F"
                        strokeWidth={2}
                        name="Ganancia"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Márgenes</CardTitle>
                  <CardDescription>
                    Margen de ganancia por categoría
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        category: "Bebidas",
                        margin: 45,
                        revenue: 8500,
                        cost: 4675,
                      },
                      {
                        category: "Snacks",
                        margin: 38,
                        revenue: 6200,
                        cost: 3844,
                      },
                      {
                        category: "Lácteos",
                        margin: 25,
                        revenue: 4800,
                        cost: 3600,
                      },
                      {
                        category: "Limpieza",
                        margin: 52,
                        revenue: 2900,
                        cost: 1392,
                      },
                      {
                        category: "Panadería",
                        margin: 35,
                        revenue: 1900,
                        cost: 1235,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{item.category}</p>
                          <p className="text-sm text-gray-500">
                            ${item.revenue.toLocaleString()} ventas • $
                            {item.cost.toLocaleString()} costos
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            {item.margin}%
                          </p>
                          <p className="text-sm text-gray-500">margen</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comisiones por Pago</CardTitle>
                  <CardDescription>Costos por método de pago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        method: "Tarjeta Crédito",
                        commission: 285.5,
                        rate: 3.5,
                        volume: 8157,
                      },
                      {
                        method: "Tarjeta Débito",
                        commission: 178.9,
                        rate: 2.5,
                        volume: 7156,
                      },
                      {
                        method: "Transferencia",
                        commission: 22.5,
                        rate: 1.0,
                        volume: 2250,
                      },
                      {
                        method: "Efectivo",
                        commission: 0,
                        rate: 0,
                        volume: 12500,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{item.method}</p>
                          <p className="text-sm text-gray-500">
                            {item.rate}% • ${item.volume.toLocaleString()}{" "}
                            volumen
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${item.commission.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">comisión</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employees Tab */}
          {/* <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Rendimiento por Empleado</CardTitle>
                  <CardDescription>
                    Análisis de ventas y productividad del equipo
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport("pdf", "rendimiento empleados")}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleExport("excel", "rendimiento empleados")
                    }
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeePerformanceData.map((employee, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">
                            {employee.transactions} transacciones •{" "}
                            {employee.hours}h trabajadas
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${employee.sales.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${employee.avgTicket} ticket • {employee.efficiency}%
                          eficiencia
                        </p>
                        <p className="text-xs text-green-600">
                          ${employee.commission} comisión
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Horarios y Productividad</CardTitle>
                  <CardDescription>
                    Distribución de horas trabajadas y eficiencia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "María González",
                        hours: 40,
                        efficiency: 95,
                        sales_per_hour: 390,
                      },
                      {
                        name: "Carlos Ruiz",
                        hours: 38,
                        efficiency: 87,
                        sales_per_hour: 326,
                      },
                      {
                        name: "Ana López",
                        hours: 35,
                        efficiency: 92,
                        sales_per_hour: 280,
                      },
                      {
                        name: "Luis Martín",
                        hours: 32,
                        efficiency: 78,
                        sales_per_hour: 256,
                      },
                    ].map((employee, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">
                            {employee.hours} horas/semana
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              employee.efficiency > 90 ? "default" : "secondary"
                            }
                          >
                            {employee.efficiency}% eficiencia
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            ${employee.sales_per_hour}/hora
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metas y Objetivos</CardTitle>
                  <CardDescription>
                    Progreso hacia objetivos mensuales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "María González",
                        target: 20000,
                        achieved: 15600,
                        percentage: 78,
                      },
                      {
                        name: "Carlos Ruiz",
                        target: 15000,
                        achieved: 12400,
                        percentage: 83,
                      },
                      {
                        name: "Ana López",
                        target: 12000,
                        achieved: 9800,
                        percentage: 82,
                      },
                      {
                        name: "Luis Martín",
                        target: 10000,
                        achieved: 8200,
                        percentage: 82,
                      },
                    ].map((employee, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {employee.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {employee.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${employee.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>${employee.achieved.toLocaleString()}</span>
                          <span>${employee.target.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent> */}

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis Predictivo</CardTitle>
                  <CardDescription>
                    Proyecciones basadas en tendencias históricas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">
                        Ventas Proyectadas (Próximos 30 días)
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">
                        $95,400
                      </p>
                      <p className="text-sm text-blue-600">
                        +15% vs período anterior
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">
                        Productos a Reabastecer
                      </h4>
                      <p className="text-2xl font-bold text-green-600">18</p>
                      <p className="text-sm text-green-600">
                        Basado en rotación actual
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">
                        Mejor Día para Promociones
                      </h4>
                      <p className="text-2xl font-bold text-purple-600">
                        Viernes
                      </p>
                      <p className="text-sm text-purple-600">
                        Mayor tráfico de clientes
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800">
                        Eficiencia Operacional
                      </h4>
                      <p className="text-2xl font-bold text-orange-600">
                        87.5%
                      </p>
                      <p className="text-sm text-orange-600">
                        Promedio del equipo
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patrones de Compra</CardTitle>
                  <CardDescription>
                    Análisis de comportamiento de clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Productos Frecuentemente Comprados Juntos
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">
                            Coca Cola + Papas Fritas
                          </span>
                          <Badge variant="secondary">67%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Pan + Leche</span>
                          <Badge variant="secondary">54%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">
                            Detergente + Suavizante
                          </span>
                          <Badge variant="secondary">43%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Café + Azúcar</span>
                          <Badge variant="secondary">38%</Badge>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Horarios Pico de Compra
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">12:00 - 14:00</span>
                          <span className="text-sm font-semibold">
                            35% del tráfico
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">18:00 - 20:00</span>
                          <span className="text-sm font-semibold">
                            28% del tráfico
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">08:00 - 10:00</span>
                          <span className="text-sm font-semibold">
                            18% del tráfico
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">20:00 - 22:00</span>
                          <span className="text-sm font-semibold">
                            12% del tráfico
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recomendaciones Inteligentes</CardTitle>
                  <CardDescription>
                    Sugerencias basadas en análisis de datos
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleExport("pdf", "análisis y recomendaciones")
                    }
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleExport("excel", "análisis y recomendaciones")
                    }
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-blue-800">
                        Aumentar Stock
                      </h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Coca Cola 500ml tiene alta demanda. Considera aumentar el
                      pedido en 30%.
                    </p>
                  </div>
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-800">
                        Promoción Sugerida
                      </h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Ofrece descuento en productos de limpieza los martes para
                      aumentar ventas.
                    </p>
                  </div>
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-orange-600 mr-2" />
                      <h4 className="font-semibold text-orange-800">
                        Optimizar Horarios
                      </h4>
                    </div>
                    <p className="text-sm text-orange-700">
                      Considera abrir 30 minutos antes los fines de semana para
                      captar más ventas.
                    </p>
                  </div>
                  <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="flex items-center mb-2">
                      <CreditCard className="h-5 w-5 text-purple-600 mr-2" />
                      <h4 className="font-semibold text-purple-800">
                        Métodos de Pago
                      </h4>
                    </div>
                    <p className="text-sm text-purple-700">
                      Implementa pagos móviles para atraer clientes más jóvenes.
                    </p>
                  </div>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-red-800">
                        Atención Requerida
                      </h4>
                    </div>
                    <p className="text-sm text-red-700">
                      4 productos críticos necesitan reabastecimiento inmediato.
                    </p>
                  </div>
                  <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-yellow-800">
                        Capacitación
                      </h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Luis Martín podría beneficiarse de capacitación en ventas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
