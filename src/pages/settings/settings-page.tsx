"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Printer,
  CreditCard,
  Package,
  Users,
  BarChart3,
  Cloud,
  Shield,
  Bell,
  Wrench,
  Save,
  Upload,
  Download,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  X,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Estados para configuraciones
  const [businessConfig, setBusinessConfig] = useState({
    name: "Minimarket El Buen Precio",
    address: "Av. Principal 123, Ciudad",
    phone: "+1 (555) 123-4567",
    email: "contacto@minimarket.com",
    taxId: "12345678-9",
    currency: "USD",
    timezone: "America/New_York",
    language: "es",
    logo: null,
  });

  const [hardwareConfig, setHardwareConfig] = useState({
    printer: {
      enabled: true,
      model: "Epson TM-T20III",
      port: "USB001",
      paperSize: "80mm",
      autoCut: true,
    },
    scanner: {
      enabled: true,
      model: "Honeywell Voyager 1200g",
      port: "USB002",
      autoEnter: true,
    },
    cashDrawer: {
      enabled: true,
      openOnSale: true,
      openOnReturn: false,
    },
    customerDisplay: {
      enabled: false,
      model: "Bixolon BCD-1100",
      port: "COM1",
    },
  });

  const [salesConfig, setSalesConfig] = useState({
    paymentMethods: [
      { id: 1, name: "Efectivo", enabled: true, fee: 0 },
      { id: 2, name: "Tarjeta de Débito", enabled: true, fee: 2.5 },
      { id: 3, name: "Tarjeta de Crédito", enabled: true, fee: 3.5 },
      { id: 4, name: "Transferencia", enabled: false, fee: 1.0 },
    ],
    tax: {
      enabled: true,
      rate: 16.0,
      included: false,
    },
    discounts: {
      maxPercent: 50,
      requireAuth: true,
      bulkDiscount: true,
    },
    receipts: {
      printAuto: true,
      showTax: true,
      showDiscount: true,
      footer: "¡Gracias por su compra!",
    },
  });

  const [inventoryConfig, setInventoryConfig] = useState({
    lowStockAlert: 10,
    autoReorder: false,
    barcodePrefix: "789",
    trackExpiry: true,
    categories: ["Bebidas", "Snacks", "Limpieza", "Lácteos", "Panadería"],
    units: ["Unidad", "Kg", "Litro", "Caja", "Paquete"],
  });

  const [usersConfig, setUsersConfig] = useState({
    users: [
      {
        id: 1,
        name: "Admin Principal",
        email: "admin@minimarket.com",
        role: "admin",
        active: true,
      },
      {
        id: 2,
        name: "Cajero 1",
        email: "cajero1@minimarket.com",
        role: "cashier",
        active: true,
      },
      {
        id: 3,
        name: "Supervisor",
        email: "supervisor@minimarket.com",
        role: "supervisor",
        active: false,
      },
    ],
    roles: {
      admin: ["all"],
      supervisor: ["sales", "inventory", "reports"],
      cashier: ["sales"],
    },
    sessionTimeout: 30,
    requireStrongPassword: true,
  });

  const [reportsConfig, setReportsConfig] = useState({
    autoGenerate: true,
    frequency: "daily",
    emailRecipients: ["admin@minimarket.com"],
    includeCharts: true,
    reportTypes: {
      sales: true,
      inventory: true,
      cashFlow: false,
      topProducts: true,
    },
  });

  const [cloudConfig, setCloudConfig] = useState({
    enabled: true,
    autoSync: true,
    syncInterval: 15,
    backupFrequency: "daily",
    lastBackup: "2024-01-07 14:30:00",
    storageUsed: "2.3 GB",
    storageLimit: "10 GB",
  });

  const [securityConfig, setSecurityConfig] = useState({
    twoFactorAuth: false,
    loginAttempts: 3,
    sessionTimeout: 30,
    auditLog: true,
    encryptData: true,
    allowRemoteAccess: false,
  });

  const [notificationConfig, setNotificationConfig] = useState({
    email: {
      enabled: true,
      lowStock: true,
      dailyReport: true,
      systemAlerts: true,
    },
    sound: {
      enabled: true,
      volume: 70,
      successSound: true,
      errorSound: true,
    },
    desktop: {
      enabled: false,
      lowStock: false,
      newSale: false,
    },
  });

  const handleSave = (section: string) => {
    setUnsavedChanges(false);
    toast.success("Configuración guardada", {
      description: `Los cambios en ${section} se han guardado correctamente.`,
    });
  };

  const handleReset = () => {
    toast.success("Configuración restablecida", {
      description: "Se han restaurado los valores por defecto.",
    });
  };

  const handleExport = () => {
    toast.success("Configuración exportada", {
      description:
        "El archivo de configuración se ha descargado correctamente.",
    });
  };

  const handleImport = () => {
    toast.success("Configuración importada", {
      description: "La configuración se ha importado correctamente.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="h-8 w-8 mr-3 text-blue-600" />
                Configuración del Sistema
              </h1>
              <p className="text-gray-600 mt-2">
                Personaliza tu sistema POS según las necesidades de tu negocio
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" onClick={handleImport}>
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>
              <Button onClick={() => handleSave("general")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Todo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="general" className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="hardware" className="flex items-center">
              <Printer className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Hardware</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Ventas</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Inventario</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Reportes</span>
            </TabsTrigger>
            <TabsTrigger value="cloud" className="flex items-center">
              <Cloud className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Nube</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center">
              <Wrench className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Avanzado</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Negocio</CardTitle>
                <CardDescription>
                  Configura los datos básicos de tu minimarket
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName">Nombre del Negocio</Label>
                    <Input
                      id="businessName"
                      value={businessConfig.name}
                      onChange={(e) => {
                        setBusinessConfig({
                          ...businessConfig,
                          name: e.target.value,
                        });
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxId">RUC/NIT</Label>
                    <Input
                      id="taxId"
                      value={businessConfig.taxId}
                      onChange={(e) => {
                        setBusinessConfig({
                          ...businessConfig,
                          taxId: e.target.value,
                        });
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Textarea
                    id="address"
                    value={businessConfig.address}
                    onChange={(e) => {
                      setBusinessConfig({
                        ...businessConfig,
                        address: e.target.value,
                      });
                      setUnsavedChanges(true);
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={businessConfig.phone}
                      onChange={(e) => {
                        setBusinessConfig({
                          ...businessConfig,
                          phone: e.target.value,
                        });
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={businessConfig.email}
                      onChange={(e) => {
                        setBusinessConfig({
                          ...businessConfig,
                          email: e.target.value,
                        });
                        setUnsavedChanges(true);
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="currency">Moneda</Label>
                    <Select
                      value={businessConfig.currency}
                      onValueChange={(value) => {
                        setBusinessConfig({
                          ...businessConfig,
                          currency: value,
                        });
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - Dólar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                        <SelectItem value="COP">
                          COP - Peso Colombiano
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Zona Horaria</Label>
                    <Select
                      value={businessConfig.timezone}
                      onValueChange={(value) => {
                        setBusinessConfig({
                          ...businessConfig,
                          timezone: value,
                        });
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">
                          Este (UTC-5)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central (UTC-6)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Montaña (UTC-7)
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          Pacífico (UTC-8)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={businessConfig.language}
                      onValueChange={(value) => {
                        setBusinessConfig({
                          ...businessConfig,
                          language: value,
                        });
                        setUnsavedChanges(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Logo del Negocio</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      {businessConfig.logo ? (
                        <img
                          src={businessConfig.logo || "/placeholder.svg"}
                          alt="Logo"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Building2 className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Logo
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG hasta 2MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("información del negocio")}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hardware Settings */}
          <TabsContent value="hardware" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Printer className="h-5 w-5 mr-2" />
                    Impresora de Recibos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Impresora</Label>
                    <Switch
                      checked={hardwareConfig.printer.enabled}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          printer: {
                            ...hardwareConfig.printer,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Modelo</Label>
                    <Select
                      value={hardwareConfig.printer.model}
                      onValueChange={(value) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          printer: { ...hardwareConfig.printer, model: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Epson TM-T20III">
                          Epson TM-T20III
                        </SelectItem>
                        <SelectItem value="Star TSP143III">
                          Star TSP143III
                        </SelectItem>
                        <SelectItem value="Bixolon SRP-330II">
                          Bixolon SRP-330II
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Puerto</Label>
                    <Input value={hardwareConfig.printer.port} readOnly />
                  </div>
                  <div>
                    <Label>Tamaño de Papel</Label>
                    <Select
                      value={hardwareConfig.printer.paperSize}
                      onValueChange={(value) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          printer: {
                            ...hardwareConfig.printer,
                            paperSize: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="58mm">58mm</SelectItem>
                        <SelectItem value="80mm">80mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Corte Automático</Label>
                    <Switch
                      checked={hardwareConfig.printer.autoCut}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          printer: {
                            ...hardwareConfig.printer,
                            autoCut: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Imprimir Prueba
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lector de Código de Barras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Escáner</Label>
                    <Switch
                      checked={hardwareConfig.scanner.enabled}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          scanner: {
                            ...hardwareConfig.scanner,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Modelo</Label>
                    <Select
                      value={hardwareConfig.scanner.model}
                      onValueChange={(value) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          scanner: { ...hardwareConfig.scanner, model: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Honeywell Voyager 1200g">
                          Honeywell Voyager 1200g
                        </SelectItem>
                        <SelectItem value="Zebra DS2208">
                          Zebra DS2208
                        </SelectItem>
                        <SelectItem value="Datalogic QuickScan">
                          Datalogic QuickScan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Puerto</Label>
                    <Input value={hardwareConfig.scanner.port} readOnly />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Enter Automático</Label>
                    <Switch
                      checked={hardwareConfig.scanner.autoEnter}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          scanner: {
                            ...hardwareConfig.scanner,
                            autoEnter: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Probar Escáner
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cajón de Dinero</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Cajón</Label>
                    <Switch
                      checked={hardwareConfig.cashDrawer.enabled}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          cashDrawer: {
                            ...hardwareConfig.cashDrawer,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Abrir en Venta</Label>
                    <Switch
                      checked={hardwareConfig.cashDrawer.openOnSale}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          cashDrawer: {
                            ...hardwareConfig.cashDrawer,
                            openOnSale: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Abrir en Devolución</Label>
                    <Switch
                      checked={hardwareConfig.cashDrawer.openOnReturn}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          cashDrawer: {
                            ...hardwareConfig.cashDrawer,
                            openOnReturn: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Abrir Cajón
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pantalla del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Pantalla</Label>
                    <Switch
                      checked={hardwareConfig.customerDisplay.enabled}
                      onCheckedChange={(checked) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          customerDisplay: {
                            ...hardwareConfig.customerDisplay,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Modelo</Label>
                    <Select
                      value={hardwareConfig.customerDisplay.model}
                      onValueChange={(value) =>
                        setHardwareConfig({
                          ...hardwareConfig,
                          customerDisplay: {
                            ...hardwareConfig.customerDisplay,
                            model: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bixolon BCD-1100">
                          Bixolon BCD-1100
                        </SelectItem>
                        <SelectItem value="Epson DM-D110">
                          Epson DM-D110
                        </SelectItem>
                        <SelectItem value="Star SCD222U">
                          Star SCD222U
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Puerto</Label>
                    <Input value={hardwareConfig.customerDisplay.port} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("hardware")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Hardware
              </Button>
            </div>
          </TabsContent>

          {/* Sales Settings */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
                <CardDescription>
                  Configura los métodos de pago aceptados en tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesConfig.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={method.enabled}
                          onCheckedChange={(checked) => {
                            const updated = salesConfig.paymentMethods.map(
                              (m) =>
                                m.id === method.id
                                  ? { ...m, enabled: checked }
                                  : m
                            );
                            setSalesConfig({
                              ...salesConfig,
                              paymentMethods: updated,
                            });
                          }}
                        />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            Comisión: {method.fee}%
                          </p>
                        </div>
                      </div>
                      <Badge variant={method.enabled ? "default" : "secondary"}>
                        {method.enabled ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Impuestos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Aplicar Impuestos</Label>
                    <Switch
                      checked={salesConfig.tax.enabled}
                      onCheckedChange={(checked) =>
                        setSalesConfig({
                          ...salesConfig,
                          tax: { ...salesConfig.tax, enabled: checked },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Tasa de Impuesto (%)</Label>
                    <Input
                      type="number"
                      value={salesConfig.tax.rate}
                      onChange={(e) =>
                        setSalesConfig({
                          ...salesConfig,
                          tax: {
                            ...salesConfig.tax,
                            rate: Number.parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Impuesto Incluido en Precio</Label>
                    <Switch
                      checked={salesConfig.tax.included}
                      onCheckedChange={(checked) =>
                        setSalesConfig({
                          ...salesConfig,
                          tax: { ...salesConfig.tax, included: checked },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Descuentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Descuento Máximo (%)</Label>
                    <Input
                      type="number"
                      value={salesConfig.discounts.maxPercent}
                      onChange={(e) =>
                        setSalesConfig({
                          ...salesConfig,
                          discounts: {
                            ...salesConfig.discounts,
                            maxPercent: Number.parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Requiere Autorización</Label>
                    <Switch
                      checked={salesConfig.discounts.requireAuth}
                      onCheckedChange={(checked) =>
                        setSalesConfig({
                          ...salesConfig,
                          discounts: {
                            ...salesConfig.discounts,
                            requireAuth: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Descuento por Volumen</Label>
                    <Switch
                      checked={salesConfig.discounts.bulkDiscount}
                      onCheckedChange={(checked) =>
                        setSalesConfig({
                          ...salesConfig,
                          discounts: {
                            ...salesConfig.discounts,
                            bulkDiscount: checked,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Recibos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Imprimir Automáticamente</Label>
                  <Switch
                    checked={salesConfig.receipts.printAuto}
                    onCheckedChange={(checked) =>
                      setSalesConfig({
                        ...salesConfig,
                        receipts: {
                          ...salesConfig.receipts,
                          printAuto: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Mostrar Impuestos</Label>
                  <Switch
                    checked={salesConfig.receipts.showTax}
                    onCheckedChange={(checked) =>
                      setSalesConfig({
                        ...salesConfig,
                        receipts: { ...salesConfig.receipts, showTax: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Mostrar Descuentos</Label>
                  <Switch
                    checked={salesConfig.receipts.showDiscount}
                    onCheckedChange={(checked) =>
                      setSalesConfig({
                        ...salesConfig,
                        receipts: {
                          ...salesConfig.receipts,
                          showDiscount: checked,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Mensaje de Pie de Página</Label>
                  <Input
                    value={salesConfig.receipts.footer}
                    onChange={(e) =>
                      setSalesConfig({
                        ...salesConfig,
                        receipts: {
                          ...salesConfig.receipts,
                          footer: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("ventas")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Ventas
              </Button>
            </div>
          </TabsContent>

          {/* Inventory Settings */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas de Inventario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Stock Mínimo para Alerta</Label>
                    <Input
                      type="number"
                      value={inventoryConfig.lowStockAlert}
                      onChange={(e) =>
                        setInventoryConfig({
                          ...inventoryConfig,
                          lowStockAlert: Number.parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Unidades restantes para activar alerta
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Reorden Automático</Label>
                    <Switch
                      checked={inventoryConfig.autoReorder}
                      onCheckedChange={(checked) =>
                        setInventoryConfig({
                          ...inventoryConfig,
                          autoReorder: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Rastrear Fechas de Vencimiento</Label>
                    <Switch
                      checked={inventoryConfig.trackExpiry}
                      onCheckedChange={(checked) =>
                        setInventoryConfig({
                          ...inventoryConfig,
                          trackExpiry: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Códigos de Barras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Prefijo para Códigos Internos</Label>
                    <Input
                      value={inventoryConfig.barcodePrefix}
                      onChange={(e) =>
                        setInventoryConfig({
                          ...inventoryConfig,
                          barcodePrefix: e.target.value,
                        })
                      }
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Ej: 789 generará códigos como 789001, 789002...
                    </p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Generar Códigos Masivos
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Categorías de Productos</CardTitle>
                <CardDescription>
                  Gestiona las categorías para organizar tu inventario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {inventoryConfig.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center space-x-2"
                      >
                        <span>{category}</span>
                        <button
                          onClick={() => {
                            const updated = inventoryConfig.categories.filter(
                              (_, i) => i !== index
                            );
                            setInventoryConfig({
                              ...inventoryConfig,
                              categories: updated,
                            });
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Nueva categoría" id="newCategory" />
                    <Button
                      onClick={() => {
                        const input = document.getElementById(
                          "newCategory"
                        ) as HTMLInputElement;
                        if (input.value.trim()) {
                          setInventoryConfig({
                            ...inventoryConfig,
                            categories: [
                              ...inventoryConfig.categories,
                              input.value.trim(),
                            ],
                          });
                          input.value = "";
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unidades de Medida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {inventoryConfig.units.map((unit, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <span>{unit}</span>
                        <button
                          onClick={() => {
                            const updated = inventoryConfig.units.filter(
                              (_, i) => i !== index
                            );
                            setInventoryConfig({
                              ...inventoryConfig,
                              units: updated,
                            });
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Nueva unidad" id="newUnit" />
                    <Button
                      onClick={() => {
                        const input = document.getElementById(
                          "newUnit"
                        ) as HTMLInputElement;
                        if (input.value.trim()) {
                          setInventoryConfig({
                            ...inventoryConfig,
                            units: [
                              ...inventoryConfig.units,
                              input.value.trim(),
                            ],
                          });
                          input.value = "";
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("inventario")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Inventario
              </Button>
            </div>
          </TabsContent>

          {/* Users Settings */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Usuarios del Sistema
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Usuario
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nuevo Usuario</DialogTitle>
                        <DialogDescription>
                          Crea una nueva cuenta de usuario para el sistema
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Nombre Completo</Label>
                          <Input placeholder="Ej: Juan Pérez" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="juan@minimarket.com"
                          />
                        </div>
                        <div>
                          <Label>Rol</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">
                                Administrador
                              </SelectItem>
                              <SelectItem value="supervisor">
                                Supervisor
                              </SelectItem>
                              <SelectItem value="cashier">Cajero</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Contraseña Temporal</Label>
                          <Input
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancelar</Button>
                          <Button>Crear Usuario</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usersConfig.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            user.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {user.role === "admin"
                            ? "Admin"
                            : user.role === "supervisor"
                            ? "Supervisor"
                            : "Cajero"}
                        </Badge>
                        <Badge
                          variant={user.active ? "default" : "destructive"}
                        >
                          {user.active ? "Activo" : "Inactivo"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Sesiones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tiempo de Sesión (minutos)</Label>
                    <Input
                      type="number"
                      value={usersConfig.sessionTimeout}
                      onChange={(e) =>
                        setUsersConfig({
                          ...usersConfig,
                          sessionTimeout: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Contraseña Segura Requerida</Label>
                    <Switch
                      checked={usersConfig.requireStrongPassword}
                      onCheckedChange={(checked) =>
                        setUsersConfig({
                          ...usersConfig,
                          requireStrongPassword: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permisos por Rol</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-medium">Administrador</Label>
                    <p className="text-sm text-gray-500">
                      Acceso completo al sistema
                    </p>
                  </div>
                  <div>
                    <Label className="font-medium">Supervisor</Label>
                    <p className="text-sm text-gray-500">
                      Ventas, inventario y reportes
                    </p>
                  </div>
                  <div>
                    <Label className="font-medium">Cajero</Label>
                    <p className="text-sm text-gray-500">
                      Solo módulo de ventas
                    </p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Configurar Permisos Detallados
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("usuarios")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Usuarios
              </Button>
            </div>
          </TabsContent>

          {/* Reports Settings */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Automáticos</CardTitle>
                <CardDescription>
                  Configura la generación y envío automático de reportes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Generar Reportes Automáticamente</Label>
                  <Switch
                    checked={reportsConfig.autoGenerate}
                    onCheckedChange={(checked) =>
                      setReportsConfig({
                        ...reportsConfig,
                        autoGenerate: checked,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Frecuencia de Generación</Label>
                  <Select
                    value={reportsConfig.frequency}
                    onValueChange={(value) =>
                      setReportsConfig({ ...reportsConfig, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Destinatarios de Email</Label>
                  <div className="space-y-2">
                    {reportsConfig.emailRecipients.map((email, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input value={email} readOnly />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated =
                              reportsConfig.emailRecipients.filter(
                                (_, i) => i !== index
                              );
                            setReportsConfig({
                              ...reportsConfig,
                              emailRecipients: updated,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex space-x-2">
                      <Input placeholder="nuevo@email.com" id="newEmail" />
                      <Button
                        onClick={() => {
                          const input = document.getElementById(
                            "newEmail"
                          ) as HTMLInputElement;
                          if (input.value.trim()) {
                            setReportsConfig({
                              ...reportsConfig,
                              emailRecipients: [
                                ...reportsConfig.emailRecipients,
                                input.value.trim(),
                              ],
                            });
                            input.value = "";
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Incluir Gráficos</Label>
                  <Switch
                    checked={reportsConfig.includeCharts}
                    onCheckedChange={(checked) =>
                      setReportsConfig({
                        ...reportsConfig,
                        includeCharts: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Reportes</CardTitle>
                <CardDescription>
                  Selecciona qué reportes generar automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Reporte de Ventas</Label>
                  <Switch
                    checked={reportsConfig.reportTypes.sales}
                    onCheckedChange={(checked) =>
                      setReportsConfig({
                        ...reportsConfig,
                        reportTypes: {
                          ...reportsConfig.reportTypes,
                          sales: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Reporte de Inventario</Label>
                  <Switch
                    checked={reportsConfig.reportTypes.inventory}
                    onCheckedChange={(checked) =>
                      setReportsConfig({
                        ...reportsConfig,
                        reportTypes: {
                          ...reportsConfig.reportTypes,
                          inventory: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Flujo de Caja</Label>
                  <Switch
                    checked={reportsConfig.reportTypes.cashFlow}
                    onCheckedChange={(checked) =>
                      setReportsConfig({
                        ...reportsConfig,
                        reportTypes: {
                          ...reportsConfig.reportTypes,
                          cashFlow: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Productos Más Vendidos</Label>
                  <Switch
                    checked={reportsConfig.reportTypes.topProducts}
                    onCheckedChange={(checked) =>
                      setReportsConfig({
                        ...reportsConfig,
                        reportTypes: {
                          ...reportsConfig.reportTypes,
                          topProducts: checked,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("reportes")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Reportes
              </Button>
            </div>
          </TabsContent>

          {/* Cloud Settings */}
          <TabsContent value="cloud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  Sincronización en la Nube
                </CardTitle>
                <CardDescription>
                  Mantén tus datos seguros y sincronizados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Habilitar Sincronización</Label>
                  <Switch
                    checked={cloudConfig.enabled}
                    onCheckedChange={(checked) =>
                      setCloudConfig({ ...cloudConfig, enabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Sincronización Automática</Label>
                  <Switch
                    checked={cloudConfig.autoSync}
                    onCheckedChange={(checked) =>
                      setCloudConfig({ ...cloudConfig, autoSync: checked })
                    }
                  />
                </div>

                <div>
                  <Label>Intervalo de Sincronización (minutos)</Label>
                  <Select
                    value={cloudConfig.syncInterval.toString()}
                    onValueChange={(value) =>
                      setCloudConfig({
                        ...cloudConfig,
                        syncInterval: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutos</SelectItem>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label>Frecuencia de Respaldo</Label>
                  <Select
                    value={cloudConfig.backupFrequency}
                    onValueChange={(value) =>
                      setCloudConfig({ ...cloudConfig, backupFrequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Último respaldo:</span>
                    <span className="text-sm font-medium">
                      {cloudConfig.lastBackup}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Almacenamiento usado:</span>
                    <span className="text-sm font-medium">
                      {cloudConfig.storageUsed}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Límite de almacenamiento:</span>
                    <span className="text-sm font-medium">
                      {cloudConfig.storageLimit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "23%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">Sincronizar Ahora</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Crear Respaldo Manual
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("nube")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Nube
              </Button>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Configuración de Seguridad
                </CardTitle>
                <CardDescription>
                  Protege tu sistema con configuraciones de seguridad avanzadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-gray-500">
                      Agrega una capa extra de seguridad
                    </p>
                  </div>
                  <Switch
                    checked={securityConfig.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSecurityConfig({
                        ...securityConfig,
                        twoFactorAuth: checked,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Intentos de Login Permitidos</Label>
                  <Select
                    value={securityConfig.loginAttempts.toString()}
                    onValueChange={(value) =>
                      setSecurityConfig({
                        ...securityConfig,
                        loginAttempts: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 intentos</SelectItem>
                      <SelectItem value="5">5 intentos</SelectItem>
                      <SelectItem value="10">10 intentos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tiempo de Sesión (minutos)</Label>
                  <Input
                    type="number"
                    value={securityConfig.sessionTimeout}
                    onChange={(e) =>
                      setSecurityConfig({
                        ...securityConfig,
                        sessionTimeout: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Registro de Auditoría</Label>
                    <p className="text-sm text-gray-500">
                      Registra todas las acciones del sistema
                    </p>
                  </div>
                  <Switch
                    checked={securityConfig.auditLog}
                    onCheckedChange={(checked) =>
                      setSecurityConfig({
                        ...securityConfig,
                        auditLog: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Encriptación de Datos</Label>
                    <p className="text-sm text-gray-500">
                      Encripta datos sensibles
                    </p>
                  </div>
                  <Switch
                    checked={securityConfig.encryptData}
                    onCheckedChange={(checked) =>
                      setSecurityConfig({
                        ...securityConfig,
                        encryptData: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Acceso Remoto</Label>
                    <p className="text-sm text-gray-500">
                      Permite conexiones desde fuera de la red local
                    </p>
                  </div>
                  <Switch
                    checked={securityConfig.allowRemoteAccess}
                    onCheckedChange={(checked) =>
                      setSecurityConfig({
                        ...securityConfig,
                        allowRemoteAccess: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Contraseña Actual</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Nueva Contraseña</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>Confirmar Nueva Contraseña</Label>
                  <Input type="password" />
                </div>
                <Button>Cambiar Contraseña</Button>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("seguridad")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Seguridad
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Notificaciones por Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Email</Label>
                    <Switch
                      checked={notificationConfig.email.enabled}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          email: {
                            ...notificationConfig.email,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Stock Bajo</Label>
                    <Switch
                      checked={notificationConfig.email.lowStock}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          email: {
                            ...notificationConfig.email,
                            lowStock: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Reporte Diario</Label>
                    <Switch
                      checked={notificationConfig.email.dailyReport}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          email: {
                            ...notificationConfig.email,
                            dailyReport: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Alertas del Sistema</Label>
                    <Switch
                      checked={notificationConfig.email.systemAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          email: {
                            ...notificationConfig.email,
                            systemAlerts: checked,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notificaciones de Sonido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Sonidos</Label>
                    <Switch
                      checked={notificationConfig.sound.enabled}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          sound: {
                            ...notificationConfig.sound,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Volumen ({notificationConfig.sound.volume}%)</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={notificationConfig.sound.volume}
                      onChange={(e) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          sound: {
                            ...notificationConfig.sound,
                            volume: Number.parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Sonido de Éxito</Label>
                    <Switch
                      checked={notificationConfig.sound.successSound}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          sound: {
                            ...notificationConfig.sound,
                            successSound: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Sonido de Error</Label>
                    <Switch
                      checked={notificationConfig.sound.errorSound}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          sound: {
                            ...notificationConfig.sound,
                            errorSound: checked,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones de Escritorio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Habilitar Escritorio</Label>
                    <Switch
                      checked={notificationConfig.desktop.enabled}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          desktop: {
                            ...notificationConfig.desktop,
                            enabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Stock Bajo</Label>
                    <Switch
                      checked={notificationConfig.desktop.lowStock}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          desktop: {
                            ...notificationConfig.desktop,
                            lowStock: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Nueva Venta</Label>
                    <Switch
                      checked={notificationConfig.desktop.newSale}
                      onCheckedChange={(checked) =>
                        setNotificationConfig({
                          ...notificationConfig,
                          desktop: {
                            ...notificationConfig.desktop,
                            newSale: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Probar Notificación
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("notificaciones")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración de Notificaciones
              </Button>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Configuración Avanzada
                </CardTitle>
                <CardDescription>
                  Configuraciones técnicas para usuarios avanzados. Modifica con
                  precaución.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">
                      <strong>Advertencia:</strong> Estas configuraciones son
                      para usuarios técnicos. Los cambios incorrectos pueden
                      afectar el funcionamiento del sistema.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Puerto del Servidor</Label>
                    <Input defaultValue="8080" />
                  </div>
                  <div>
                    <Label>Timeout de Conexión (segundos)</Label>
                    <Input defaultValue="30" type="number" />
                  </div>
                </div>

                <div>
                  <Label>Cadena de Conexión de Base de Datos</Label>
                  <Input
                    defaultValue="localhost:5432/posmarket"
                    type="password"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Límite de Memoria (MB)</Label>
                    <Input defaultValue="512" type="number" />
                  </div>
                  <div>
                    <Label>Nivel de Log</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Mantenimiento del Sistema</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Logs
                    </Button>
                    <Button variant="outline">Limpiar Cache</Button>
                    <Button variant="outline">Optimizar Base de Datos</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-600">
                    Zona de Peligro
                  </h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-red-800">
                          Restablecer Configuración
                        </p>
                        <p className="text-sm text-red-600">
                          Restaura todas las configuraciones a valores por
                          defecto
                        </p>
                      </div>
                      <Button variant="destructive" onClick={handleReset}>
                        Restablecer
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-red-800">
                          Reiniciar Sistema
                        </p>
                        <p className="text-sm text-red-600">
                          Reinicia completamente el sistema POS
                        </p>
                      </div>
                      <Button variant="destructive">Reiniciar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("configuración avanzada")}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración Avanzada
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Unsaved Changes Warning */}
        {unsavedChanges && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Tienes cambios sin guardar
              </p>
              <Button
                size="sm"
                onClick={() => handleSave("cambios pendientes")}
              >
                Guardar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
