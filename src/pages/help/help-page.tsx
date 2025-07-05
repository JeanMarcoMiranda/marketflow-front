"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Book,
  Video,
  Settings,
  ShoppingCart,
  BarChart3,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "support",
      message:
        "¡Hola! Soy María del equipo de soporte. ¿En qué puedo ayudarte hoy?",
      time: "14:30",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleContactSupport = (type: string) => {
    if (type === "phone") {
      alert(
        "Llamando al +1 (555) 123-4567...\n\nEn una aplicación real, esto abriría la aplicación de teléfono o marcaría automáticamente."
      );
    } else if (type === "email") {
      setShowContactForm(true);
    } else if (type === "chat") {
      setShowChatDialog(true);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: "user",
          message: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");

      // Simular respuesta automática
      setTimeout(() => {
        const responses = [
          "Entiendo tu consulta. Déjame revisar esa información para ti.",
          "Perfecto, puedo ayudarte con eso. ¿Podrías darme más detalles?",
          "Esa es una excelente pregunta. Te voy a guiar paso a paso.",
          "He revisado tu caso y tengo la solución. Te explico cómo proceder.",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "support",
            message: randomResponse,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 2000);
    }
  };

  const handleSubmitContactForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(
      `Ticket de soporte creado exitosamente!\n\nNúmero de ticket: #${Math.floor(
        Math.random() * 10000
      )}\nPrioridad: ${
        contactForm.priority
      }\n\nRecibirás una respuesta en tu email dentro de 24 horas.`
    );
    setShowContactForm(false);
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    });
  };

  const guideSteps = {
    "Procesar una Venta": [
      "Inicia sesión en el sistema POS",
      "Haz clic en 'Nueva Venta' o presiona F1",
      "Escanea el código de barras o busca el producto manualmente",
      "Ajusta la cantidad si es necesario",
      "Aplica descuentos si corresponde",
      "Selecciona el método de pago (efectivo, tarjeta, etc.)",
      "Confirma la transacción",
      "Imprime el recibo para el cliente",
    ],
    "Gestión de Inventario": [
      "Ve al módulo 'Inventario' desde el menú principal",
      "Haz clic en 'Agregar Producto'",
      "Completa la información básica (nombre, código, precio)",
      "Selecciona la categoría del producto",
      "Configura el stock inicial y stock mínimo",
      "Agrega una imagen del producto (opcional)",
      "Configura impuestos si aplica",
      "Guarda el producto",
      "Verifica que aparezca en la lista de inventario",
    ],
    "Generar Reportes": [
      "Accede al módulo 'Reportes' desde el menú",
      "Selecciona el tipo de reporte (ventas, inventario, etc.)",
      "Configura el rango de fechas",
      "Aplica filtros si es necesario (categoría, vendedor, etc.)",
      "Haz clic en 'Generar Reporte'",
      "Revisa los datos en pantalla",
      "Exporta a PDF o Excel si lo necesitas",
    ],
    "Configuración Inicial": [
      "Ejecuta el asistente de configuración inicial",
      "Configura los datos de tu negocio",
      "Establece las categorías de productos",
      "Configura los métodos de pago aceptados",
      "Conecta hardware (impresora, lector de códigos)",
      "Configura usuarios y permisos",
      "Establece impuestos y tarifas",
      "Importa productos iniciales",
      "Configura copias de seguridad automáticas",
      "Realiza una venta de prueba",
      "Configura reportes automáticos",
      "Completa la configuración de red",
    ],
  };

  const supportOptions = [
    {
      icon: Phone,
      title: "Soporte Telefónico",
      description: "Lunes a Viernes 8:00 AM - 6:00 PM",
      contact: "+1 (555) 123-4567",
      availability: "Disponible ahora",
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      description: "Respuesta en 24 horas",
      contact: "soporte@posmarket.com",
      availability: "Siempre disponible",
    },
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Asistencia inmediata",
      contact: "Iniciar chat",
      availability: "En línea",
    },
  ];

  const quickGuides = [
    {
      icon: ShoppingCart,
      title: "Procesar una Venta",
      description: "Aprende a registrar productos y completar transacciones",
      time: "3 min",
      steps: 5,
    },
    {
      icon: Package,
      title: "Gestión de Inventario",
      description: "Agregar, editar y controlar stock de productos",
      time: "5 min",
      steps: 8,
    },
    {
      icon: BarChart3,
      title: "Generar Reportes",
      description: "Crear reportes de ventas y análisis de negocio",
      time: "4 min",
      steps: 6,
    },
    {
      icon: Settings,
      title: "Configuración Inicial",
      description: "Configurar tu sistema POS por primera vez",
      time: "10 min",
      steps: 12,
    },
  ];

  const faqData = [
    {
      category: "Ventas y Transacciones",
      questions: [
        {
          q: "¿Cómo proceso una venta con múltiples productos?",
          a: "Escanea o busca cada producto, ajusta cantidades si es necesario, aplica descuentos si corresponde, y selecciona el método de pago. El sistema calculará automáticamente el total incluyendo impuestos.",
        },
        {
          q: "¿Puedo aplicar descuentos a productos individuales?",
          a: "Sí, puedes aplicar descuentos por porcentaje o monto fijo tanto a productos individuales como a la venta completa. Ve a 'Descuentos' durante la transacción.",
        },
        {
          q: "¿Cómo manejo devoluciones y reembolsos?",
          a: "Ve a 'Transacciones' > 'Devoluciones', busca la venta original, selecciona los productos a devolver y elige el método de reembolso.",
        },
      ],
    },
    {
      category: "Inventario",
      questions: [
        {
          q: "¿Cómo agrego nuevos productos al sistema?",
          a: "Ve a 'Inventario' > 'Agregar Producto', completa la información básica (nombre, código, precio, categoría), configura el stock inicial y guarda.",
        },
        {
          q: "¿El sistema me alerta cuando el stock está bajo?",
          a: "Sí, puedes configurar alertas de stock mínimo para cada producto. Recibirás notificaciones cuando el inventario esté por agotarse.",
        },
        {
          q: "¿Puedo importar productos desde un archivo Excel?",
          a: "Sí, ve a 'Inventario' > 'Importar' y sube un archivo CSV o Excel con el formato requerido. Descarga nuestra plantilla para asegurar compatibilidad.",
        },
      ],
    },
    {
      category: "Hardware y Configuración",
      questions: [
        {
          q: "¿Qué impresoras son compatibles?",
          a: "Soportamos impresoras térmicas de 58mm y 80mm de marcas como Epson, Star, y Bixolon. Consulta la lista completa en 'Configuración' > 'Hardware'.",
        },
        {
          q: "¿Cómo configuro el lector de código de barras?",
          a: "Conecta el lector USB, ve a 'Configuración' > 'Hardware' > 'Escáner', y sigue el asistente de configuración. La mayoría se configuran automáticamente.",
        },
      ],
    },
  ];

  const troubleshooting = [
    {
      problem: "La aplicación se cierra inesperadamente",
      solution:
        "Reinicia la aplicación, verifica que tengas la última versión instalada, y asegúrate de tener suficiente memoria RAM disponible.",
      severity: "high",
    },
    {
      problem: "No puedo conectar la impresora",
      solution:
        "Verifica que la impresora esté encendida, revisa las conexiones USB, instala los drivers necesarios desde nuestra sección de descargas.",
      severity: "medium",
    },
    {
      problem: "Los reportes no se generan correctamente",
      solution:
        "Verifica el rango de fechas seleccionado, asegúrate de tener permisos de administrador, y revisa que no haya filtros activos.",
      severity: "low",
    },
    {
      problem: "Error de sincronización con la nube",
      solution:
        "Verifica tu conexión a internet, revisa las credenciales de tu cuenta, y intenta sincronizar manualmente desde Configuración.",
      severity: "medium",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Centro de Ayuda
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Todo lo que necesitas saber sobre tu sistema POS para minimarket
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar en la ayuda... ej: 'cómo procesar una venta'"
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Support Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contactar Soporte
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Card
                key={index + 1}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <option.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-semibold text-gray-900 mb-2">
                    {option.contact}
                  </p>
                  <Badge
                    variant={
                      option.availability === "Disponible ahora"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {option.availability}
                  </Badge>
                  <Button
                    className="w-full mt-4"
                    onClick={() => {
                      let contactType: string;
                      if (option.title === "Soporte Telefónico") {
                        contactType = "phone";
                      } else if (option.title === "Correo Electrónico") {
                        contactType = "email";
                      } else {
                        contactType = "chat";
                      }
                      handleContactSupport(contactType);
                    }}
                  >
                    {option.title === "Chat en Vivo"
                      ? "Iniciar Chat"
                      : "Contactar"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Guías Rápidas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickGuides.map((guide, index) => (
              <Dialog key={index + 1}>
                <DialogTrigger asChild>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <guide.icon className="h-8 w-8 text-blue-600 mb-2" />
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {guide.time}
                        </span>
                        <span>{guide.steps} pasos</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                      >
                        Ver Guía
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <guide.icon className="h-6 w-6 text-blue-600 mr-2" />
                      {guide.title}
                    </DialogTitle>
                    <DialogDescription>{guide.description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Pasos a seguir:</h4>
                    <div className="space-y-3">
                      {guideSteps[guide.title as keyof typeof guideSteps]?.map(
                        (step, stepIndex) => (
                          <div
                            key={stepIndex + 1}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {stepIndex + 1}
                            </div>
                            <p className="text-gray-700">{step}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Consejo:</strong> Si tienes problemas con
                        algún paso, no dudes en contactar nuestro soporte
                        técnico.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="faq" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriales</TabsTrigger>
            <TabsTrigger value="troubleshooting">
              Solución de Problemas
            </TabsTrigger>
            <TabsTrigger value="downloads">Descargas</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-8">
            <div className="space-y-8">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`item-${categoryIndex}-${itemIndex}`}
                      >
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Video className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Videos Tutoriales</CardTitle>
                  <CardDescription>
                    Aprende visualmente con nuestros videos paso a paso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Configuración inicial del sistema</span>
                      <Badge>12:30</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Gestión avanzada de inventario</span>
                      <Badge>8:45</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Reportes y análisis de ventas</span>
                      <Badge>15:20</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Todos los Videos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Documentación Completa</CardTitle>
                  <CardDescription>
                    Guías detalladas para cada función del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Manual del Usuario</span>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Guía de Configuración</span>
                      <Badge variant="outline">PDF</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>API Documentation</span>
                      <Badge variant="outline">Web</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Documentación
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Problemas Comunes y Soluciones
              </h3>
              {troubleshooting.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <AlertCircle
                        className={`h-6 w-6 mt-1 ${
                          item.severity === "high"
                            ? "text-red-500"
                            : item.severity === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {item.problem}
                        </h4>
                        <p className="text-gray-600 mb-3">{item.solution}</p>
                        <Badge
                          variant={
                            item.severity === "high"
                              ? "destructive"
                              : item.severity === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {item.severity === "high"
                            ? "Crítico"
                            : item.severity === "medium"
                            ? "Moderado"
                            : "Menor"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Software y Drivers</CardTitle>
                  <CardDescription>
                    Descargas esenciales para tu sistema POS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">POS Market v2.1.3</h4>
                        <p className="text-sm text-gray-600">
                          Última versión del software
                        </p>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Drivers de Impresora</h4>
                        <p className="text-sm text-gray-600">
                          Compatible con todas las marcas
                        </p>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plantillas y Recursos</CardTitle>
                  <CardDescription>
                    Archivos útiles para configurar tu negocio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">
                          Plantilla de Productos
                        </h4>
                        <p className="text-sm text-gray-600">
                          Excel para importar inventario
                        </p>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Diseños de Recibo</h4>
                        <p className="text-sm text-gray-600">
                          Plantillas personalizables
                        </p>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Estado del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Servidores</span>
                <Badge className="bg-green-100 text-green-800">Operativo</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Base de Datos</span>
                <Badge className="bg-green-100 text-green-800">Operativo</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Sincronización</span>
                <Badge className="bg-green-100 text-green-800">Operativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-gray-600 mb-4">
            ¿No encontraste lo que buscabas? Nuestro equipo de soporte está aquí
            para ayudarte.
          </p>
          <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
            <DialogTrigger asChild>
              <Button size="lg">Contactar Soporte Técnico</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Contactar Soporte Técnico</DialogTitle>
                <DialogDescription>
                  Elige cómo prefieres contactarnos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => {
                    setShowSupportDialog(false);
                    handleContactSupport("phone");
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar ahora: +1 (555) 123-4567
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => {
                    setShowSupportDialog(false);
                    handleContactSupport("email");
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar email de soporte
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => {
                    setShowSupportDialog(false);
                    handleContactSupport("chat");
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Iniciar chat en vivo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* Contact Form Dialog */}
        <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Ticket de Soporte</DialogTitle>
              <DialogDescription>
                Completa el formulario y te responderemos dentro de 24 horas
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitContactForm} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="pb-2">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="pb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="pb-2">
                  Asunto
                </Label>
                <Input
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="priority" className="pb-2">
                  Prioridad
                </Label>
                <select
                  id="priority"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={contactForm.priority}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, priority: e.target.value })
                  }
                >
                  <option value="low">Baja - Consulta general</option>
                  <option value="medium">Media - Problema funcional</option>
                  <option value="high">Alta - Sistema no funciona</option>
                  <option value="urgent">Urgente - Negocio paralizado</option>
                </select>
              </div>
              <div>
                <Label htmlFor="message" className="pb-2">
                  Describe tu problema
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Describe detalladamente el problema que estás experimentando..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Crear Ticket</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Chat Dialog */}
        <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
          <DialogContent className="max-w-md h-[600px] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Chat de Soporte - María
              </DialogTitle>
              <DialogDescription>Soporte técnico en línea</DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-xs text-gray-500 mt-2 text-center">
              Tiempo de respuesta promedio: 2 minutos
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HelpPage;
