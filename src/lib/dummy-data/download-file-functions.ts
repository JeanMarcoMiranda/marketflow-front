import type { Product } from "@/api/types/response.types";

// Función para descargar un archivo
const downloadFile = (content: string, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Función para descargar CSV de productos
export const downloadProductsCSV = (products: Product[]) => {
  const headers = [
    'ID',
    'Nombre',
    'Descripción',
    'SKU',
    'Precio Unitario',
    'Precio Costo',
    'Unidad de Medida',
    'Gravable',
    'Activo',
    'Fecha Vencimiento',
    'Número Lote'
  ];

  const csvContent = [
    headers.join(','),
    ...products.map(product => [
      product.id,
      `"${product.name}"`,
      `"${product.description}"`,
      product.sku,
      product.unit_price,
      product.cost_price,
      `"${product.unit_of_measure}"`,
      product.taxable ? 'Sí' : 'No',
      product.active ? 'Sí' : 'No',
      product.expiration_date,
      product.batch_number
    ].join(','))
  ].join('\n');

  downloadFile(csvContent, 'plantilla_productos.csv', 'text/csv;charset=utf-8;');
};

// Función para descargar Manual de Usuario (PDF simulado como texto)
export const downloadUserManual = () => {
  const content = `MANUAL DE USUARIO - SISTEMA POS MINIMARKET
===========================================

ÍNDICE
------
1. Introducción
2. Instalación y Configuración Inicial
3. Gestión de Productos
4. Procesamiento de Ventas
5. Reportes y Análisis
6. Configuración Avanzada
7. Solución de Problemas
8. Soporte Técnico

1. INTRODUCCIÓN
---------------
Bienvenido al Sistema POS para minimarket, una solución completa diseñada para optimizar la gestión de tu negocio.

Características principales:
- Gestión completa de inventario
- Procesamiento rápido de ventas
- Reportes detallados
- Soporte para múltiples métodos de pago
- Integración con hardware POS

2. INSTALACIÓN Y CONFIGURACIÓN INICIAL
--------------------------------------
Pasos para la instalación:
1. Descargar el instalador desde el sitio oficial
2. Ejecutar como administrador
3. Seguir el asistente de instalación
4. Configurar base de datos
5. Establecer parámetros iniciales del negocio

3. GESTIÓN DE PRODUCTOS
-----------------------
Para agregar un nuevo producto:
1. Ir a Inventario > Agregar Producto
2. Completar información básica
3. Configurar precios y stock
4. Guardar cambios

Para editar productos existentes:
1. Buscar el producto en la lista
2. Hacer clic en "Editar"
3. Modificar los campos necesarios
4. Guardar cambios

4. PROCESAMIENTO DE VENTAS
--------------------------
Proceso de venta estándar:
1. Presionar "Nueva Venta"
2. Escanear o buscar productos
3. Ajustar cantidades si es necesario
4. Aplicar descuentos si corresponde
5. Seleccionar método de pago
6. Confirmar transacción
7. Imprimir recibo

5. REPORTES Y ANÁLISIS
----------------------
Tipos de reportes disponibles:
- Ventas por período
- Productos más vendidos
- Análisis de inventario
- Reportes de caja
- Estados financieros

6. CONFIGURACIÓN AVANZADA
-------------------------
Configuraciones disponibles:
- Impresoras y hardware
- Métodos de pago
- Impuestos y tarifas
- Usuarios y permisos
- Copias de seguridad

7. SOLUCIÓN DE PROBLEMAS
------------------------
Problemas comunes y soluciones:
- Problemas de conexión
- Errores de impresión
- Sincronización de datos
- Rendimiento del sistema

8. SOPORTE TÉCNICO
------------------
Canales de soporte:
- Teléfono: +1 (555) 123-4567
- Email: soporte@posmarket.com
- Chat en línea disponible 24/7

Para más información, visite: www.posmarket.com/soporte

© 2024 POS Market. Todos los derechos reservados.`;

  downloadFile(content, 'manual_usuario.txt', 'text/plain;charset=utf-8;');
};

// Función para descargar Guía de Dispositivos Compatibles
export const downloadCompatibleDevicesGuide = () => {
  const content = `GUÍA DE DISPOSITIVOS COMPATIBLES - SISTEMA POS
=============================================

HARDWARE COMPATIBLE
-------------------

IMPRESORAS TÉRMICAS
===================

58mm (Impresoras pequeñas)
-------------------------
✓ Epson TM-T20III
✓ Epson TM-T82III
✓ Star TSP143III
✓ Bixolon SRP-275III
✓ Citizen CT-S310II

80mm (Impresoras estándar)
--------------------------
✓ Epson TM-T88VI
✓ Epson TM-T88V
✓ Star TSP650II
✓ Bixolon SRP-350III
✓ Citizen CT-S4000

LECTORES DE CÓDIGO DE BARRAS
============================

USB (Plug & Play)
-----------------
✓ Honeywell Voyager 1200g
✓ Symbol LS2208
✓ Datalogic QuickScan Lite QW2100
✓ Code CR1000
✓ Unitech MS146

Inalámbricos
------------
✓ Honeywell Voyager 1452g
✓ Symbol DS6708
✓ Datalogic PowerScan PM9500
✓ Zebra DS2278

CAJONES DE DINERO
=================
✓ APG Vasario Series
✓ Star Micronics CD3-1616
✓ Epson DM-D30
✓ M-S Cash Drawer 4141

PANTALLAS SECUNDARIAS
=====================
✓ Epson DM-D110
✓ Bematech LD9900
✓ Partner Tech CD-7220
✓ Logic Controls PD3000

BALANZAS ELECTRÓNICAS
=====================
✓ Toledo Prix 4 Plus
✓ Systel Croma
✓ Epelsa Bacus
✓ CAS AP-1

SOFTWARE REQUERIDO
==================

Sistema Operativo
-----------------
✓ Windows 10 (64-bit) - Recomendado
✓ Windows 11 (64-bit)
✓ Windows Server 2019
✓ Windows Server 2022

Drivers Requeridos
------------------
• Microsoft Visual C++ Redistributable
• .NET Framework 4.8 o superior
• Drivers específicos de cada dispositivo

CONFIGURACIÓN DE RED
====================

Requisitos mínimos:
- Conexión a Internet estable (mín. 10 Mbps)
- Router con puertos Ethernet
- Switch para múltiples terminales

ESPECIFICACIONES TÉCNICAS MÍNIMAS
=================================

Hardware del Sistema:
- Procesador: Intel Core i3 o equivalente AMD
- RAM: 4GB mínimo (8GB recomendado)
- Almacenamiento: 250GB SSD
- Puertos USB: Mínimo 4 puertos USB 2.0
- Puerto Ethernet: Gigabit recomendado

INSTALACIÓN Y CONFIGURACIÓN
===========================

1. Conectar hardware en el siguiente orden:
   - Impresora térmica (USB)
   - Lector de código de barras (USB)
   - Cajón de dinero (RJ45 a impresora)
   - Pantalla secundaria (USB/Serial)

2. Instalar drivers en orden:
   - Drivers de impresora
   - Controladores USB
   - Software POS
   - Configurar dispositivos

3. Pruebas de funcionalidad:
   - Test de impresión
   - Escaneo de códigos
   - Apertura de cajón
   - Comunicación de red

SOLUCIÓN DE PROBLEMAS
====================

Impresora no responde:
- Verificar conexión USB
- Reinstalar drivers
- Verificar papel térmico

Lector no escanea:
- Limpiar lente
- Verificar configuración
- Probar en otro puerto USB

Cajón no abre:
- Verificar cable RJ45
- Configurar comando de apertura
- Verificar alimentación

SOPORTE TÉCNICO
===============
Para asistencia con hardware:
- Email: hardware@posmarket.com
- Teléfono: +1 (555) 123-4567 ext. 2
- Chat: Disponible 24/7

Actualizaciones y drivers:
- www.posmarket.com/drivers
- Actualización automática disponible

© 2024 POS Market. Todos los derechos reservados.`;

  downloadFile(content, 'guia_dispositivos_compatibles.txt', 'text/plain;charset=utf-8;');
};

// Función para descargar diseños de tickets y boletas
export const downloadTicketDesigns = () => {
  const content = `DISEÑOS DE TICKETS Y BOLETAS - PLANTILLAS
=========================================

PLANTILLA BÁSICA - TICKET ESTÁNDAR
==================================

[LOGO NEGOCIO]
MINIMARKET EL PROGRESO
RUC: 20123456789
Dir: Av. Principal 123, Lima

================================
        BOLETA DE VENTA
     B001-00000001
================================
Fecha: 25/07/2024    Hora: 14:30
Cajero: María Pérez
Cliente: Cliente General

--------------------------------
PRODUCTO         CANT    TOTAL
--------------------------------
Coca Cola 500ml   2     S/ 5.00
Pan Integral      1     S/ 3.75
Leche Entera 1L   1     S/ 4.20
--------------------------------
                SUBTOTAL: S/ 12.95
                     IGV: S/ 2.07
                   TOTAL: S/ 15.02
--------------------------------
EFECTIVO:               S/ 20.00
VUELTO:                 S/ 4.98

¡Gracias por su compra!
Vuelva pronto

================================

PLANTILLA PROMOCIONAL
=====================

[LOGO NEGOCIO]
🛒 MINIMARKET EL AHORRO 🛒
RUC: 20987654321
"Sus compras más económicas"

********************************
        TICKET DE VENTA
        T001-00000125
********************************
📅 25/07/2024  ⏰ 16:45
👤 Vendedor: Carlos López
🏪 Sucursal: Principal

********************************
🛍️ PRODUCTOS COMPRADOS
********************************
🥤 Agua Mineral 1.5L  x3  S/ 5.40
🍞 Galletas Choc.     x2  S/ 5.80
🧴 Jabón Líquido     x1  S/ 3.20
********************************
           🧾 RESUMEN DE COMPRA
           Subtotal:    S/ 14.40
           Descuento:   S/ 1.44
           IGV (18%):   S/ 2.33
           💰 TOTAL:    S/ 15.29
********************************
💳 Método: Tarjeta Visa ****1234
✅ PAGADO

🎉 ¡FELICIDADES! 🎉
Ganaste 15 puntos de fidelidad
Total acumulado: 248 puntos

Próxima compra: 10% descuento
Válido hasta: 31/07/2024

¡Gracias por elegirnos!
www.minimercado.com
********************************

PLANTILLA COMPACTA
==================

QUICK MART EXPRESS
RUC: 20456789123
Av. Comercio 456

===================
VENTA: V001-0001089
===================
25/07/24    18:20
Caja: 01

-------------------
Arroz 1kg      5.00
Manzanas      6.50
Café 500g     8.75
-------------------
Subtotal:    20.25
IGV:          3.24
TOTAL:       23.49
-------------------
Efectivo:    25.00
Cambio:       1.51

¡Gracias!
===================

PLANTILLA DETALLADA - FACTURA
=============================

[LOGO EMPRESA]
DISTRIBUIDORA COMERCIAL S.A.C.
RUC: 20123456789
Av. Los Negocios 789, San Isidro
Teléfono: (01) 234-5678
Email: ventas@distribuidora.com

=============================================
           FACTURA ELECTRÓNICA
              F001-00000156
=============================================

DATOS DEL CLIENTE:
Razón Social: MINIMARKET DON PEDRO E.I.R.L.
RUC: 20987654321
Dirección: Jr. Comercio 321, Pueblo Libre

Fecha Emisión: 25/07/2024
Fecha Vencimiento: 09/08/2024
Vendedor: Ana García
Condición: Crédito 15 días

=============================================
DETALLE DE PRODUCTOS
=============================================
CÓDIGO    DESCRIPCIÓN           CANT   P.UNIT    TOTAL
---------------------------------------------
CC500     Coca Cola 500ml         24    2.50     60.00
PI001     Pan Integral            12    3.75     45.00
LE1L      Leche Entera 1L         18    4.20     75.60
AB1KG     Arroz Blanco 1kg        10    5.00     50.00
JL250     Jabón Líquido 250ml      6    3.20     19.20
---------------------------------------------
                         SUBTOTAL:    S/ 249.80
                      DESCUENTO 5%:   S/ 12.49
                      BASE IMPONIBLE: S/ 237.31
                           IGV (18%): S/ 42.72
                            TOTAL A PAGAR: S/ 280.03

=============================================
CONDICIONES COMERCIALES:
- Mercadería viajera por cuenta del comprador
- No se aceptan devoluciones después de 24 horas
- Verificar productos al momento de la entrega

OBSERVACIONES:
Entrega programada para el 26/07/2024

Para consultas: soporte@distribuidora.com
¡Gracias por su confianza!
=============================================

INSTRUCCIONES DE USO
====================

1. CONFIGURACIÓN EN EL SISTEMA:
   - Ir a Configuración > Impresión
   - Seleccionar "Personalizar Diseño"
   - Copiar el código de la plantilla deseada
   - Ajustar campos según necesidad

2. VARIABLES DISPONIBLES:
   {LOGO}           - Logo del negocio
   {NOMBRE_NEGOCIO} - Nombre comercial
   {RUC}            - Número RUC
   {DIRECCION}      - Dirección del local
   {TELEFONO}       - Teléfono de contacto
   {FECHA}          - Fecha de la venta
   {HORA}           - Hora de la venta
   {NUMERO_TICKET}  - Número correlativo
   {CAJERO}         - Nombre del cajero
   {CLIENTE}        - Datos del cliente
   {PRODUCTOS}      - Lista de productos
   {SUBTOTAL}       - Subtotal sin impuestos
   {IGV}            - Impuesto general
   {TOTAL}          - Total a pagar
   {EFECTIVO}       - Monto recibido
   {VUELTO}         - Cambio entregado

3. PERSONALIZACIÓN:
   - Modificar textos promocionales
   - Agregar códigos QR
   - Incluir redes sociales
   - Añadir términos y condiciones

Para soporte técnico:
Email: tickets@posmarket.com
Teléfono: +1 (555) 123-4567

© 2024 POS Market - Plantillas de Diseño`;

  downloadFile(content, 'diseños_tickets_boletas.txt', 'text/plain;charset=utf-8;');
};

export const downloadFunctions = {
  downloadProductsCSV,
  downloadUserManual,
  downloadCompatibleDevicesGuide,
  downloadTicketDesigns
};